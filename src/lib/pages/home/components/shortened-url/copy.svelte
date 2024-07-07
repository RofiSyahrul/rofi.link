<script lang="ts">
  import { onDestroy } from 'svelte';

  import type { Ref } from '$lib/types/general';
  import copyToClipboard from '$lib/utils/dom/copy-to-clipboard';

  let hasBeenCopied = false;

  const timeout: Ref<ReturnType<typeof setTimeout> | undefined> = {
    ref: undefined,
  };

  async function handleClick(this: HTMLButtonElement) {
    const copiedText =
      this.querySelector('[data-target]')?.textContent;
    if (copiedText) {
      await copyToClipboard(window, document, copiedText);
      hasBeenCopied = true;
    }
  }

  $: if (hasBeenCopied) {
    clearTimeout(timeout.ref);
    timeout.ref = setTimeout(() => {
      hasBeenCopied = false;
    }, 1000);
  }

  onDestroy(() => {
    clearTimeout(timeout.ref);
  });
</script>

<button class="btn btn-text" type="button" on:click={handleClick}>
  {#if hasBeenCopied}
    <slot name="check" />
  {:else}
    <slot name="copy" />
  {/if}
  <span class="visually-hidden" data-target>
    <slot name="target" />
  </span>
</button>
