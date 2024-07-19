import { defineAction, z } from 'astro:actions';

import { availableLanguageTags } from '$/paraglide/runtime';

const inputSchema = z.object({
  lang: z.enum(availableLanguageTags),
});

export const switchLang = defineAction({
  accept: 'form',
  input: inputSchema,
  handler({ lang }) {
    return { lang };
  },
});
