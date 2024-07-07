import { defineAction, z } from 'astro:actions';
import { RESERVED_SLUG } from 'astro:env/server';

import { prisma } from '$lib/prisma';

import {
  ACTUAL_URL_INVALID_MESSAGE,
  SLUG_HELPER_MESSAGE,
  SLUG_REGEXP,
} from './constants.server';
import { CustomActionError, CustomActionInputError } from '../error';

const shortenNewURLInputSchema = z.object({
  actualURL: z.string().url(ACTUAL_URL_INVALID_MESSAGE),
  slug: z.string().regex(SLUG_REGEXP, SLUG_HELPER_MESSAGE),
});

const RESERVED_SLUGS = new Set(RESERVED_SLUG.split(','));

export const shortenNewURL = defineAction({
  accept: 'form',
  input: shortenNewURLInputSchema,
  async handler(input, ctx) {
    const { actualURL, slug } = input;

    const makeConflictSlugError = () => {
      return new CustomActionInputError(
        input,
        { slug: [`"${slug}" sudah digunakan`] },
        'CONFLICT',
      );
    };

    const makeInaccessibleActualURLError = () => {
      return new CustomActionInputError(input, {
        actualURL: [`Tautan "${actualURL}" tidak dapat diakses`],
      });
    };

    if (RESERVED_SLUGS.has(slug)) {
      throw makeConflictSlugError();
    }

    const { locals, site } = ctx;

    let actualURLResponse: Response;
    try {
      actualURLResponse = await fetch(actualURL);
    } catch (error) {
      locals.logger.error(`Failed to fetch "${actualURL}"`, error);
      throw makeInaccessibleActualURLError();
    }

    if (!actualURLResponse.ok) throw makeInaccessibleActualURLError();

    try {
      const res = await prisma.url.create({
        data: { actualURL, slug },
        select: { id: true, slug: true },
      });
      locals.session.shortenedURLManager.storeIdForGuestUser(res.id);
      return { shortenedURL: new URL(res.slug, site) };
    } catch (error) {
      if (prisma.isUniqueConstraintFailed(error)) {
        throw makeConflictSlugError();
      }
      locals.logger.fatal('Failed to shorten new URL', error, {
        actualURL,
        slug,
      });
      throw new CustomActionError(
        input,
        'Terjadi kesalahan. Silakan coba beberapa saat lagi',
      );
    }
  },
});
