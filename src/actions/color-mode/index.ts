import { defineAction } from 'astro:actions';

export const toggleColorMode = defineAction({
  accept: 'form',
  handler(_input, ctx) {
    const newColorMode = ctx.locals.colorModeManager.toggle();
    return { newColorMode };
  },
});
