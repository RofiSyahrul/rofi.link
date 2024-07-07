import { defineAction } from 'astro:actions';

export const toggleColorMode = defineAction({
  handler(_input, ctx) {
    ctx.locals.colorModeManager.toggle();
    return { ok: true };
  },
});
