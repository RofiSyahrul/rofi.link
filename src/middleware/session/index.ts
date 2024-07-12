import type { Account } from '@prisma/client';
import type {
  AstroCookies,
  AstroCookieSetOptions,
  MiddlewareHandler,
} from 'astro';
import { z } from 'astro/zod';
import {
  SHORTENED_URL_MANAGER_COOKIE_KEY,
  USER_SESSION_COOKIE_KEY,
} from 'astro:env/server';

import { prisma } from '$lib/prisma';

import type { Logger } from '../logger';

const arrayOfStringSchema = z.array(z.string());

type CurrentUser = Pick<Account, 'avatarURL' | 'id' | 'name'>;

const cookiesSetOptions: AstroCookieSetOptions = {
  httpOnly: true,
  maxAge: 31_536_000,
  path: '/',
  sameSite: 'lax',
  secure:
    import.meta.env.PROD &&
    import.meta.env.SITE.startsWith('https://'),
};

class UserSession {
  readonly #cookieKey = USER_SESSION_COOKIE_KEY;
  readonly #cookies: AstroCookies;
  readonly #logger: Logger;

  #currentUser: CurrentUser | null = null;

  constructor(cookies: AstroCookies, logger: Logger) {
    this.#cookies = cookies;
    this.#logger = logger;
  }

  public get currentUser() {
    return this.#currentUser;
  }

  public async fetchCurrentUser(): Promise<CurrentUser | null> {
    if (this.#currentUser) return this.#currentUser;

    const accountId = this.#cookies.get(this.#cookieKey)?.value;
    if (!accountId) {
      this.#currentUser = null;
      return this.#currentUser;
    }

    try {
      const account = await prisma.account.findUnique({
        select: { avatarURL: true, id: true, name: true },
        where: { id: accountId },
      });
      if (account) {
        this.#currentUser = account;
        return this.#currentUser;
      }
    } catch (error) {
      this.#logger.error(`Failed to fetch current user`, error, {
        accountId,
      });
    }

    this.#cookies.delete(this.#cookieKey);
    this.#currentUser = null;
    return this.#currentUser;
  }

  public storeId(id: string) {
    this.#cookies.set(this.#cookieKey, id, cookiesSetOptions);
  }

  public async signIn() {
    // TODO: implementation
  }
}

class ShortenedURLManager {
  readonly #cookieKey = SHORTENED_URL_MANAGER_COOKIE_KEY;
  readonly #cookies: AstroCookies;
  readonly #userSession: UserSession;

  #allStoredIds: Set<string> | undefined;

  constructor(cookies: AstroCookies, userSession: UserSession) {
    this.#cookies = cookies;
    this.#userSession = userSession;
  }

  #getAllStoredIds(): Set<string> {
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
    if (this.#userSession.currentUser) return;

    const allStoredIds = this.#getAllStoredIds();
    allStoredIds.add(id);
    this.#cookies.set(
      this.#cookieKey,
      JSON.stringify([...allStoredIds]),
      cookiesSetOptions,
    );
  }

  public async flushStoredIdsForCurrentUser() {
    // TODO: implementation
  }
}

class Session {
  readonly #userSession: UserSession;
  #isInitialized = false;

  public shortenedURLManager: ShortenedURLManager;
  public signIn: () => Promise<void>;

  constructor(cookies: AstroCookies, logger: Logger) {
    this.#userSession = new UserSession(cookies, logger);
    this.signIn = this.#userSession.signIn.bind(this.#userSession);

    this.shortenedURLManager = new ShortenedURLManager(
      cookies,
      this.#userSession,
    );
  }

  public async init(): Promise<Session> {
    if (this.#isInitialized) {
      return this;
    }
    await this.#userSession.fetchCurrentUser();
    this.#isInitialized = true;
    return this;
  }

  public get currentUser() {
    return this.#userSession.currentUser;
  }
}

export type { Session };

export const sessionInjectorAndHandler: MiddlewareHandler = async (
  ctx,
  next,
) => {
  const session = new Session(ctx.cookies, ctx.locals.logger);
  ctx.locals.session = await session.init();
  return next();
};
