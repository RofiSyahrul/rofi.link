import { defineAction } from 'astro:actions';

export const toggleColorMode = defineAction({
  accept: 'form',
  handler(_input, ctx) {
    ctx.locals.colorModeManager.toggle();
    return { ok: true };
  },
});
