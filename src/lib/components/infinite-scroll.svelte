<script lang="ts" context="module">
  export type InfiniteScrollEvent = {
    'reach-lowermost': undefined;
  };

  function getScrollTarget(
    thisEl: HTMLDivElement,
    selector?: string,
  ): Window | HTMLElement {
    if (selector) {
      const target =
        thisEl.querySelector(selector) ??
        document.querySelector(selector);

      if (target instanceof HTMLElement) return target;
    }

    return window;
  }

  function isReachLowermostOnWindow() {
    const currentPosition =
      document.body.offsetHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    return currentPosition >= scrollHeight;
  }

  function isReachLowermostOnElement(el: HTMLElement) {
    const currentPosition = el.offsetHeight + el.scrollTop;
    return currentPosition >= el.scrollHeight;
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let isLoading = false;
  export let scrollTarget: string | undefined = undefined;

  let element: HTMLDivElement;

  const dispatch = createEventDispatcher<InfiniteScrollEvent>();

  export function getElement() {
    return element;
  }

  function handleScroll(this: Window | HTMLElement) {
    const isReachLowermost =
      this instanceof HTMLElement
        ? isReachLowermostOnElement(this)
        : isReachLowermostOnWindow();

    if (isReachLowermost) {
      dispatch('reach-lowermost');
    }
  }

  onMount(() => {
    const target = getScrollTarget(element, scrollTarget);

    target.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div bind:this={element}>
  <slot />

  {#if isLoading}
    <div class="loading" title="Loading...">
      <span class="spinner" />
      <span class="visually-hidden">Loading...</span>
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px auto;
    width: 100%;
  }
</style>
