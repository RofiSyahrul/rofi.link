<script lang="ts" context="module">
  export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

  type FormFieldEventDetail = {
    field: FieldElement;
    form: HTMLFormElement;
    formControl: HTMLElement | null;
  };

  type FormCustomEvent = {
    'input-field': FormFieldEventDetail;
    'invalid-field': FormFieldEventDetail;
    'valid-field': FormFieldEventDetail;
  };

  export type FormFieldEvent = CustomEvent<FormFieldEventDetail>;

  const INVALID = 'invalid';

  const isFieldElement = (
    target: EventTarget | null,
  ): target is FieldElement => {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    );
  };

  const getFormControl = (
    field: FieldElement,
  ): HTMLElement | null => {
    const formControl = field.closest('[data-form-control]');
    return formControl instanceof HTMLElement ? formControl : null;
  };

  const updateFieldOrFieldsetClass = (
    field: FieldElement,
    method: 'add' | 'remove',
    className: string,
  ) => {
    const { classList } = field.closest('fieldset') ?? field;
    const fn = classList[method].bind(classList);
    fn(className);
  };

  const handleInvalidField = (
    field: FieldElement,
    formControl: HTMLElement | null,
  ) => {
    updateFieldOrFieldsetClass(field, 'add', INVALID);
    if (formControl) {
      formControl.dataset.formControl = INVALID;
    }
  };

  const handleValidField = (
    field: FieldElement,
    formControl: HTMLElement | null,
  ) => {
    updateFieldOrFieldsetClass(field, 'remove', INVALID);
    if (formControl) {
      formControl.dataset.formControl = '';
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let action: string | undefined = undefined;
  export let autoSubmit = false;
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
      const formControl = getFormControl(target);
      const eventDetail: FormFieldEventDetail = {
        field: target,
        form: this,
        formControl,
      };
      dispatch('input-field', eventDetail);

      const { invalidValue } = target.dataset;
      if (invalidValue) {
        target.setCustomValidity(
          target.value === invalidValue ? 'invalid' : '',
        );
      }

      if (target.validity.valid) {
        handleValidField(target, formControl);
        dispatch('valid-field', eventDetail);
        if (autoSubmit) {
          const button = this.querySelector<HTMLButtonElement>(
            'button[type="submit"]',
          );
          button?.click();
        }
      } else {
        handleInvalidField(target, formControl);
        dispatch('invalid-field', eventDetail);
      }
    }
  }

  function handleInvalid(this: HTMLFormElement, event: Event) {
    const target = event.target;
    if (isFieldElement(target)) {
      const formControl = getFormControl(target);
      handleInvalidField(target, formControl);
      dispatch('invalid-field', {
        field: target,
        form: this,
        formControl,
      });
    }
  }
</script>

<form
  {action}
  class={className}
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
