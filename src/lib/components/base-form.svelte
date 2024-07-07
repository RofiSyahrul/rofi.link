<script lang="ts" context="module">
  export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

  export type FormCustomEvent = {
    'input-field': {
      field: FieldElement;
      form: HTMLFormElement;
    };
  };

  const INVALID = 'invalid';

  function isFieldElement(
    target: EventTarget | null,
  ): target is FieldElement {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    );
  }

  function handleInvalidField(field: FieldElement) {
    const fieldset = field.closest('fieldset');
    if (fieldset) {
      fieldset.classList.add(INVALID);
    } else {
      field.classList.add(INVALID);
    }

    const formControl = field.closest('[data-form-control]');
    if (formControl instanceof HTMLElement) {
      formControl.dataset.formControl = INVALID;
    }
  }

  function handleValidField(field: FieldElement) {
    const fieldset = field.closest('fieldset');
    if (fieldset) {
      fieldset.classList.remove(INVALID);
    } else {
      field.classList.remove(INVALID);
    }

    const formControl = field.closest('[data-form-control]');
    if (formControl instanceof HTMLElement) {
      formControl.dataset.formControl = '';
    }
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let action: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let method: 'dialog' | 'get' | 'post' = 'post';
  export let name: string | undefined = undefined;

  const dispatch = createEventDispatcher<FormCustomEvent>();
  let form: HTMLFormElement;

  export function getElement() {
    return form;
  }

  function handleInput(this: HTMLFormElement, event: Event) {
    const target = event.target;
    if (isFieldElement(target)) {
      if (target.validity.valid) {
        handleValidField(target);
      } else {
        handleInvalidField(target);
      }

      dispatch('input-field', { field: target, form: this });

      if (target.validity.valid) {
        handleValidField(target);
      }
    }
  }

  function handleInvalid(this: HTMLFormElement, event: Event) {
    const target = event.target;
    if (isFieldElement(target)) {
      handleInvalidField(target);
    }
  }
</script>

<form
  {action}
  {id}
  {method}
  {name}
  bind:this={form}
  on:input|capture={handleInput}
  on:invalid|capture|preventDefault={handleInvalid}
  on:submit
>
  <slot />
</form>
