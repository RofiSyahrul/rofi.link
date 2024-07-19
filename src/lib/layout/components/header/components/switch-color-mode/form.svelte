<script lang="ts" context="module">
  import { actions } from 'astro:actions';

  import BaseForm from '$lib/components/base-form.svelte';

  function handleSubmit(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault();
    const root = this.ownerDocument.documentElement;
    root.classList.toggle('dark');
    root.classList.toggle('light');
    actions.toggleColorMode(new FormData()).catch(() => {});
  }
</script>

<BaseForm
  autoSubmit
  method="post"
  name="switch-color-mode"
  on:submit={handleSubmit}
>
  <slot />
</BaseForm>
