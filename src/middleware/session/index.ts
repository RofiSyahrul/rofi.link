import type { AstroCookies, MiddlewareHandler } from 'astro';
import { z } from 'astro/zod';
import { actions } from 'astro:actions';
import { SHORTENED_URL_MANAGER_COOKIE_KEY } from 'astro:env/server';

import { HOMEPAGE_PATH } from '$lib/constants/internal-urls';
import { prisma } from '$lib/prisma';

import { UserSession } from './user-session';
import { COOKIES_SET_OPTIONS } from '../constants';
import type { Logger } from '../logger';

const arrayOfStringSchema = z.array(z.string());

class ShortenedURLManager {
  readonly #cookieKey = SHORTENED_URL_MANAGER_COOKIE_KEY;
  readonly #cookies: AstroCookies;
  readonly #logger: Logger;
  readonly #userSession: UserSession;

  #allStoredIds: Set<string> | undefined;

  constructor(
    cookies: AstroCookies,
    logger: Logger,
    userSession: UserSession,
  ) {
    this.#cookies = cookies;
    this.#logger = logger;
    this.#userSession = userSession;
  }

  private get allStoredIds(): Set<string> {
    if (this.#allStoredIds) return this.#allStoredIds;

    try {
      const cookieValue = this.#cookies.get(this.#cookieKey)?.json();
      const storedIds = arrayOfStringSchema.parse(cookieValue);
      this.#allStoredIds = new Set(storedIds);
    } catch {
      this.#allStoredIds = new Set<string>();
    }

    return this.#allStoredIds;
  }

  public storeIdForGuestUser(id: string) {
    if (this.#userSession.currentUser) return this;

    this.allStoredIds.add(id);
    this.#cookies.set(
      this.#cookieKey,
      JSON.stringify([...this.allStoredIds]),
      COOKIES_SET_OPTIONS,
    );

    return this;
  }

  public async flushStoredIdsForCurrentUser() {
    const { currentUser } = this.#userSession;
    const allStoredIds = [...this.allStoredIds];

    if (!currentUser || allStoredIds.length === 0) return this;

    try {
      await prisma.url.updateMany({
        data: { accountId: currentUser.id },
        where: {
          account: null,
          id: {
            in: allStoredIds,
          },
        },
      });
      this.allStoredIds.clear();
      this.#cookies.delete(this.#cookieKey, COOKIES_SET_OPTIONS);
    } catch (error) {
      this.#logger.error(
        `Failed to flush stored ids for current user`,
        error,
        { currentUser, allStoredIds },
      );
    }

    return this;
  }
}

class Session extends UserSession {
  #isInitialized = false;

  public shortenedURLManager: ShortenedURLManager;

  constructor(cookies: AstroCookies, logger: Logger) {
    super(cookies, logger);
    this.shortenedURLManager = new ShortenedURLManager(
      cookies,
      logger,
      this,
    );
  }

  public async init(): Promise<Session> {
    if (this.#isInitialized) {
      return this;
    }
    await this.fetchCurrentUser();
    this.#isInitialized = true;
    return this;
  }
}

export type { Session };

export const sessionInjectorAndHandler: MiddlewareHandler = async (
  ctx,
  next,
) => {
  const session = new Session(ctx.cookies, ctx.locals.logger);
  ctx.locals.session = await session.init();

  const response = await next();

  if (ctx.url.pathname === actions.signIn.toString()) {
    const redirectURL = new URL(
      ctx.url.searchParams.get('r') ?? HOMEPAGE_PATH,
      ctx.url.origin,
    );
    ctx.cookies.delete('g_csrf_token');
    return ctx.redirect(redirectURL.pathname + redirectURL.search);
  }

  const isSignInFailed = session.status === 'sign-in-failed';
  const isSignInSuccess = session.status === 'sign-in-success';

  if (isSignInFailed || isSignInSuccess) {
    session.status = isSignInFailed ? 'guest' : 'signed-in';
  }

  return response;
};
