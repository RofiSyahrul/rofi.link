<script lang="ts" context="module">
  import BaseForm, {
    type FormCustomEvent,
  } from '$lib/components/base-form.svelte';

  const handleInputField = (
    event: CustomEvent<FormCustomEvent['input-field']>,
  ) => {
    const button = event.detail.form.querySelector('button');
    button?.click();
  };

  function handleSubmit(this: HTMLFormElement) {
    const body = this.ownerDocument.body;
    body.classList.toggle('dark');
    body.classList.toggle('light');
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
