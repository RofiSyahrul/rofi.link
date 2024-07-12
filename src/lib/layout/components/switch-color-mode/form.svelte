<script lang="ts" context="module">
  import { actions } from 'astro:actions';

  import BaseForm, {
    type FormFieldEvent,
  } from '$lib/components/base-form.svelte';

  const handleInputField = (event: FormFieldEvent) => {
    const button = event.detail.form.querySelector('button');
    button?.click();
  };

  function handleSubmit(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault();
    const root = this.ownerDocument.documentElement;
    root.classList.toggle('dark');
    root.classList.toggle('light');
    actions.toggleColorMode().catch(() => {});
  }
</script>

<BaseForm
  method="post"
  name="switch-color-mode"
  on:input-field={handleInputField}
  on:submit={handleSubmit}
>
  <slot />
</BaseForm>
