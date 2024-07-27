import { z } from 'astro/zod';
import { GOOGLE_RECAPTCHA_SECRET_KEY } from 'astro:env/server';

interface RecaptchaActionInputProps {
  readonly name: 'recaptchaAction';
  readonly type: 'hidden';
  readonly value: string;
}

export function getRecaptchaActionInputProps<
  T extends (args: FormData) => unknown,
>(action: T): RecaptchaActionInputProps {
  return {
    name: 'recaptchaAction',
    type: 'hidden',
    value: action
      .toString()
      .replaceAll('/_actions/', '')
      .replaceAll(/\W/g, '_'),
  };
}

function buildVerifyRecaptchaURL(
  token: string,
  remoteIP?: string,
): URL {
  const url = new URL(
    'https://www.google.com/recaptcha/api/siteverify',
  );

  url.searchParams.set('secret', GOOGLE_RECAPTCHA_SECRET_KEY);
  url.searchParams.set('response', token);
  if (remoteIP) {
    url.searchParams.set('remoteip', remoteIP);
  }

  return url;
}

const recaptchaJSONResponseSchema = z.object({
  challenge_ts: z.string().optional(),
  'error-codes': z.array(z.any()).optional(),
  hostname: z.string().optional(),
  success: z.boolean(),
});

export async function verifyRecaptchaToken(
  token: string,
  remoteIP?: string,
) {
  try {
    const response = await fetch(
      buildVerifyRecaptchaURL(token, remoteIP),
      {
        method: 'POST',
      },
    );
    const json = await response.json();
    return recaptchaJSONResponseSchema.parse(json);
  } catch {
    return { success: false };
  }
}
