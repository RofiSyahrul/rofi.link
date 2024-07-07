import { defineAction, z } from 'astro:actions';

const signInPayloadSchema = z.object({ credential: z.string() });

export const signIn = defineAction({
  accept: 'form',
  input: signInPayloadSchema,
  async handler({ credential }, ctx) {
    const session = await ctx.locals.session.signIn(credential);
    await session.shortenedURLManager.flushStoredIdsForCurrentUser();
    return { ok: true };
  },
});

export const signOut = defineAction({
  accept: 'form',
  handler: (_, ctx) => {
    ctx.locals.session.signOut();
    return { ok: true };
  },
});
