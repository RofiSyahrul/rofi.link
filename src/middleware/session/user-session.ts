import type { Account } from '@prisma/client';
import type { AstroCookies } from 'astro';
import { z } from 'astro/zod';
import {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
  USER_SESSION_COOKIE_KEY,
} from 'astro:env/server';
import { OAuth2Client } from 'google-auth-library';

import { prisma } from '$lib/prisma';

import { COOKIES_SET_OPTIONS } from '../constants';
import type { Logger } from '../logger';

export type CurrentUser = Pick<Account, 'avatarURL' | 'id' | 'name'>;

const oauth2Client = new OAuth2Client({
  clientId: GOOGLE_AUTH_CLIENT_ID,
  clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
});

const googleAccountPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url().optional(),
  sub: z.string(),
});

const sessionStatusSchema = z.enum([
  'guest',
  'sign-in-failed',
  'sign-in-success',
  'signed-in',
]);

type SessionStatus = z.infer<typeof sessionStatusSchema>;

export class UserSession {
  readonly #clientId = GOOGLE_AUTH_CLIENT_ID;
  readonly #cookieKey = USER_SESSION_COOKIE_KEY;
  readonly #statusKey = '__tmp.st__';
  readonly #cookies: AstroCookies;
  readonly #logger: Logger;

  #currentUser: CurrentUser | null = null;
  #status: SessionStatus = 'guest';

  constructor(cookies: AstroCookies, logger: Logger) {
    this.#cookies = cookies;
    this.#logger = logger;
  }

  public get currentUser() {
    return this.#currentUser;
  }

  public get status() {
    return this.#status;
  }

  public set status(value: SessionStatus) {
    if (value === 'sign-in-failed' || value === 'sign-in-success') {
      this.#cookies.set(this.#statusKey, value, COOKIES_SET_OPTIONS);
    } else if (this.#cookies.has(this.#statusKey)) {
      this.#cookies.delete(this.#statusKey, COOKIES_SET_OPTIONS);
    }
    this.#status = value;
  }

  #getStatusFromCookie() {
    const value = this.#cookies.get(this.#statusKey)?.value;
    const { data } = sessionStatusSchema.safeParse(value);
    return data;
  }

  protected async fetchCurrentUser(): Promise<UserSession> {
    if (this.#currentUser) {
      this.status = this.#getStatusFromCookie() ?? 'signed-in';
      return this;
    }

    const accountId = this.#cookies.get(this.#cookieKey)?.value;
    if (!accountId) {
      this.#currentUser = null;
      this.status = this.#getStatusFromCookie() ?? 'guest';
      return this;
    }

    try {
      const account = await prisma.account.findUnique({
        select: { avatarURL: true, id: true, name: true },
        where: { id: accountId },
      });
      if (account) {
        this.#currentUser = account;
        this.status = this.#getStatusFromCookie() ?? 'signed-in';
        return this;
      }
    } catch (error) {
      this.#logger.error(`Failed to fetch current user`, error, {
        accountId,
      });
    }

    this.signOut().status = this.#getStatusFromCookie() ?? 'guest';

    return this;
  }

  async #verifyTokenAndGetPayload(token: string) {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.#clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error(`Failed to verify token "${token}"`);
    }
    return googleAccountPayloadSchema.parse(payload);
  }

  public async signIn(token: string) {
    try {
      const {
        email,
        name,
        picture: avatarURL,
        sub: googleAccountId,
      } = await this.#verifyTokenAndGetPayload(token);

      this.#currentUser = await prisma.account.upsert({
        create: { avatarURL, email, googleAccountId, name },
        update: { avatarURL, email, name },
        select: { avatarURL: true, id: true, name: true },
        where: { googleAccountId },
      });

      this.#cookies.set(
        this.#cookieKey,
        this.#currentUser.id,
        COOKIES_SET_OPTIONS,
      );

      this.status = 'sign-in-success';
    } catch (error) {
      this.#logger.error('Failed to login with google', error, {
        token,
      });
      this.signOut().status = 'sign-in-failed';
    }

    return this;
  }

  public signOut() {
    this.#cookies.delete(this.#cookieKey, COOKIES_SET_OPTIONS);
    this.#currentUser = null;
    this.status = 'guest';
    return this;
  }
}
