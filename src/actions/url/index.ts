import { defineAction, z } from 'astro:actions';
import { RESERVED_SLUG } from 'astro:env/server';

import * as m from '$/paraglide/messages';

import { prisma } from '$lib/prisma';
import { verifyRecaptchaToken } from '$lib/services/recaptcha.server';

import {
  ACTUAL_URL_REGEXP,
  SLUG_MAX_LENGTH,
  SLUG_REGEXP,
} from './constants.server';
import { CustomActionError, CustomActionInputError } from '../error';

const shortenNewURLInputSchema = z.object({
  actualURL: z.string().refine(
    value => {
      if (!ACTUAL_URL_REGEXP.test(value)) return false;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    () => ({
      message: m.input_actual_url_invalid(),
    }),
  ),
  recaptchaToken: z.string(),
  slug: z.string().refine(
    value => SLUG_REGEXP.test(value),
    () => ({
      message: m.input_slug_helper({ max: SLUG_MAX_LENGTH }),
    }),
  ),
});

const RESERVED_SLUGS = new Set(RESERVED_SLUG.split(','));

export const shortenNewURL = defineAction({
  accept: 'form',
  input: shortenNewURLInputSchema,
  async handler(input, ctx) {
    const { actualURL, recaptchaToken, slug } = input;

    const makeConflictSlugError = () => {
      return new CustomActionInputError(
        input,
        { slug: [m.input_error_conflict({ slug })] },
        'CONFLICT',
      );
    };

    const makeInaccessibleActualURLError = () => {
      return new CustomActionInputError(input, {
        actualURL: [m.input_error_inaccessible({ url: actualURL })],
      });
    };

    if (RESERVED_SLUGS.has(slug)) {
      throw makeConflictSlugError();
    }

    const { clientAddress, locals, site } = ctx;

    const response = await verifyRecaptchaToken(
      recaptchaToken,
      clientAddress,
    );

    if (!response.success) {
      locals.logger.error(
        m.recaptcha_verification_failed({}, { languageTag: 'en' }),
        response,
      );
      throw new CustomActionError(
        input,
        m.recaptcha_verification_failed(),
        'BAD_REQUEST',
      );
    }

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
        data: {
          ...(locals.session.currentUser?.id && {
            account: {
              connect: { id: locals.session.currentUser.id },
            },
          }),
          actualURL,
          slug,
        },
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
      throw new CustomActionError(input, m.input_error_unknown());
    }
  },
});
