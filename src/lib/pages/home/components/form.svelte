<script lang="ts">
  import BaseForm, {
    type FormFieldEvent,
  } from '$lib/components/base-form.svelte';

  const invalidFields = new Set<string>();

  const updateSubmitButtonState = (
    form: HTMLFormElement,
    state: 'disabled' | 'enabled',
  ) => {
    const submitButton = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );
    if (submitButton) {
      submitButton.disabled = state === 'disabled';
    }
  };

  const handleInvalidField = (ev: FormFieldEvent) => {
    const { name } = ev.detail.field;
    invalidFields.add(name);
    updateSubmitButtonState(ev.detail.form, 'disabled');
  };

  const handleValidField = (ev: FormFieldEvent) => {
    const { name } = ev.detail.field;
    invalidFields.delete(name);
    if (invalidFields.size === 0) {
      updateSubmitButtonState(ev.detail.form, 'enabled');
    }
  };
</script>

<BaseForm
  class="form"
  name="shorten-url"
  method="post"
  on:invalid-field={handleInvalidField}
  on:valid-field={handleValidField}
>
  <slot />
</BaseForm>
