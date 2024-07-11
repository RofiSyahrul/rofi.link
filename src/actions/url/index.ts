import { ActionError, defineAction, z } from 'astro:actions';

import { prisma } from '$lib/prisma';

const inputSchema = z.object({
  actualURL: z
    .string()
    .url('Tautan harus dimulai dengan http:// atau https://'),
  slug: z
    .string()
    .regex(
      /[\w-]{1,50}/,
      'Karakter yang diperbolehkan: huruf, angka, - dan _. Maks 50 karakter',
    ),
});

export const shortenNewURL = defineAction({
  accept: 'form',
  input: inputSchema,
  async handler({ actualURL, slug }, ctx) {
    const conflictError = new ActionError({
      code: 'CONFLICT',
      message: `"${slug}" sudah digunakan`,
    });

    try {
      const res = await prisma.url.create({
        data: { actualURL, slug },
        select: { slug: true },
      });
      return { shortenedURL: new URL(res.slug, ctx.site) };
    } catch (error) {
      if (prisma.isUniqueConstraintFailed(error)) {
        throw conflictError;
      }
      throw error;
    }
  },
});
