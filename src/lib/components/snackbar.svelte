<script lang="ts" context="module">
  import type { SnackbarDetail } from '$lib/types/snackbar';

  export type SnackbarVariant = SnackbarDetail['variant'];

  export type SnackbarEvent = {
    destroyed: undefined;
  };
</script>

<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';

  export let duration: number | null = 3500;
  export let variant: SnackbarVariant = 'neutral';

  let isActive = false;
  let timer: ReturnType<typeof setTimeout>;

  const dispatch = createEventDispatcher<SnackbarEvent>();

  function close() {
    isActive = false;
  }

  function remove() {
    clearTimeout(timer);
    close();
    dispatch('destroyed');
  }

  onMount(async () => {
    await tick();
    isActive = true;

    if (duration == null) return;

    timer = setTimeout(() => {
      close();
    }, duration);
  });
</script>

<div>
  {#if isActive}
    <div
      class={`snackbar snackbar_${variant}`}
      role="alert"
      in:fly={{ x: '100%' }}
      out:fly={{ x: '-100%', opacity: 1 }}
      on:outroend={remove}
    >
      <div class="snackbar__message">
        <slot />
      </div>
    </div>
  {/if}
</div>

<style>
  .snackbar {
    display: inline-flex;
    pointer-events: auto;
    align-items: center;
    justify-content: space-around;
    border-radius: 4px;
    margin: 8px 0;
    box-shadow: var(--shadow-high);
    pointer-events: auto;
    min-height: 48px;
  }

  .snackbar_neutral {
    background-color: var(--color-neutral-dim);
  }

  .snackbar_error {
    background-color: var(--color-danger-dim);
  }

  .snackbar_success {
    background-color: var(--color-primary-bright);
  }

  .snackbar__message {
    margin: 4px;
    color: transparent;
    filter: invert(1) brightness(1) grayscale(1) contrast(9);
    background: inherit;
    background-clip: text;
  }
</style>
