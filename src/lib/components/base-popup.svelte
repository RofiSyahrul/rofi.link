<script lang="ts" context="module">
  import type { ActionReturn } from 'svelte/action';

  export type PopupEventMap = {
    overlayclick: MouseEvent & {
      currentTarget: EventTarget & HTMLElement;
    };
  };

  interface PortalParams {
    isForceRender: boolean;
    target: HTMLElement | null;
  }

  const PORTAL_ID = '__PORTAL__';

  function getOrCreatePortalTarget(doc: Document) {
    let target = doc.querySelector<HTMLElement>('#' + PORTAL_ID);
    if (target) return target;

    target = doc.createElement('div');
    target.id = PORTAL_ID;
    doc.body.append(target);

    return target;
  }

  function portal(
    element: HTMLDivElement,
    { isForceRender, target }: PortalParams,
  ): ActionReturn<HTMLElement> {
    if (isForceRender || !target) {
      return { destroy: () => {} };
    }

    target.append(element);

    return {
      destroy() {
        element.remove();
      },
    };
  }

  const noop = () => {};
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isForceRender = false;
  export let isOpen = false;

  let animationType: 'enter' | 'leave' | undefined = undefined;
  let isShown = false;
  let portalTarget: HTMLElement | null = null;
  let prevOverflow = '';

  const dispatch = createEventDispatcher<PopupEventMap>();

  function handleOpen() {
    animationType = 'enter';
    isShown = true;

    if (typeof window !== 'undefined') {
      if (!portalTarget && !isForceRender) {
        portalTarget = getOrCreatePortalTarget(document);
      }

      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  function handleClose() {
    animationType = 'leave';
  }

  function handleAnimationEnd() {
    if (animationType === 'leave') {
      isShown = false;
      document.body.style.overflow = prevOverflow;
    }
  }

  $: if (isOpen) {
    handleOpen();
  } else {
    handleClose();
  }
</script>

{#if portalTarget || isForceRender}
  <div
    aria-hidden={!isShown}
    class="popup"
    data-animation-type={animationType}
    use:portal={{ isForceRender, target: portalTarget }}
    on:animationend={handleAnimationEnd}
  >
    <div
      class="overlay"
      role="none"
      tabindex="-1"
      on:click={e => dispatch('overlayclick', e)}
      on:keyup={noop}
    />

    <dialog
      class="scrollbar-thin scrollbar-track-neutral-bright1 scrollbar-thumb-primary-dim"
      open={isShown}
    >
      <slot />
    </dialog>
  </div>
{/if}

<style lang="scss">
  dialog {
    position: relative;
    max-width: var(--popup-max-width);
    max-height: var(--popup-max-height);
    padding: 16px;
    overflow: auto;
    border: none;
    border-radius: 8px;
    animation-duration: inherit;
    animation-fill-mode: inherit;

    @apply text-neutral-dim bg-neutral-bright shadow-xl;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @apply bg-neutral-dim0 bg-opacity-55;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    animation-duration: 0.2s;
    animation-timing-function: ease-in;
    animation-fill-mode: both;

    --popup-max-height: 90%;
    --popup-max-width: 95%;

    &[aria-hidden='true'] {
      display: none;
    }

    &[data-animation-type='enter'] {
      animation-name: fadeIn;

      dialog {
        animation-name: zoomIn;
      }
    }

    &[data-animation-type='leave'] {
      animation-name: fadeOut;

      .overlay {
        pointer-events: none;
      }

      dialog {
        animation-name: zoomOut;
      }
    }
  }
</style>
