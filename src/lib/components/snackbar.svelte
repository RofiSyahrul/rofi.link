<script lang="ts" context="module">
  import type { SnackbarVariant } from '$lib/types/snackbar';

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

<div data-snackbar={isActive ? variant : ''}>
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
      {#if duration == null}
        <button
          class="btn btn-solid"
          class:btn-primary={variant === 'neutral' ||
            variant === 'success'}
          class:btn-danger={variant === 'error'}
          type="button"
          on:click={close}
        >
          ✕
          <span class="visually-hidden">Tutup</span>
        </button>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  div[data-snackbar=''] {
    display: contents;
  }

  .snackbar {
    position: relative;
    display: inline-flex;
    gap: 4px;
    justify-content: space-between;
    min-height: 48px;
    padding: 12px 8px;
    border-radius: 4px;
    pointer-events: auto;

    @apply shadow-lg;
  }

  .snackbar_neutral {
    @apply bg-neutral-dim;
  }

  .snackbar_error {
    @apply bg-danger-bright;
  }

  .snackbar_success {
    @apply bg-primary-bright;
  }

  .snackbar__message {
    color: transparent;
    background: inherit;
    background-clip: text;
    filter: invert(1) brightness(1) grayscale(1) contrast(9);
  }

  button {
    --size: 24px;

    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }

  @include dark {
    .snackbar_neutral {
      @apply bg-neutral-dim;
    }

    .snackbar_error {
      @apply bg-danger-dim;
    }

    .snackbar_success {
      @apply bg-primary-dim;
    }
  }
</style>
