<script lang="ts" context="module">
  import type { ComponentType } from 'svelte';

  import * as m from '$/paraglide/messages';

  import AstroIcon from '$lib/icons/astro-icon.svelte';
  import PrismaIcon from '$lib/icons/prisma-icon.svelte';
  import SvelteIcon from '$lib/icons/svelte-icon.svelte';
  import TailwindIcon from '$lib/icons/tailwind-icon.svelte';
  import TypescriptIcon from '$lib/icons/typescript-icon.svelte';

  interface TechStack {
    href: string;
    icon: ComponentType;
    name: string;
  }

  const techStacks: TechStack[] = [
    {
      href: 'https://astro.build/',
      icon: AstroIcon,
      name: 'Astro',
    },
    {
      href: 'https://svelte.dev/',
      icon: SvelteIcon,
      name: 'Svelte',
    },
    {
      href: 'https://www.prisma.io/',
      icon: PrismaIcon,
      name: 'Prisma',
    },
    {
      href: 'https://www.typescriptlang.org/',
      icon: TypescriptIcon,
      name: 'TypeScript',
    },
    {
      href: 'https://tailwindcss.com/',
      icon: TailwindIcon,
      name: 'Tailwind CSS',
    },
  ];

  const total = techStacks.length;
</script>

{#each techStacks as { href, icon, name }, index (name)}
  {@const isLastIndex = index === total - 1}
  {isLastIndex ? m.base_and() : ''}
  <span>
    <a
      class="btn btn-text btn-primary"
      {href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svelte:component this={icon} />
      {name}
    </a>
    {isLastIndex ? '' : ','}
  </span>
{/each}
