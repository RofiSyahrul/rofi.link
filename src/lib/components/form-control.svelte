<script lang="ts">
  import clsx from 'clsx';

  let className = '';
  export { className as class };

  export let el: 'div' | 'label' = 'label';
  export let invalid = false;
  export let helperText = '';
  export let label: string;
  export let required = false;

  const parsedHelperText = helperText.replaceAll('$label', label);
</script>

<svelte:element
  this={el}
  class={clsx('form-control', className)}
  class:required
  data-form-control={invalid ? 'invalid' : ''}
  title={parsedHelperText}
>
  <div class="label">
    {label}
  </div>

  <slot />

  {#if parsedHelperText}
    <div class="helper">{parsedHelperText}</div>
  {/if}
</svelte:element>

<style lang="scss">
  .form-control {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &.required .label::after {
      order: 2;
      margin-left: 2px;
      content: '*';

      @apply text-danger-dim;
    }

    .helper {
      position: absolute;
      top: 100%;
      right: 4px;
      z-index: 10;
      display: none;
      max-width: 90%;
      margin-top: -4px;
      padding: 8px;
      border-radius: 4px;

      @apply text-danger-dim bg-neutral-bright shadow;

      &::before {
        position: absolute;
        right: 8px;
        bottom: 100%;
        border: 6px solid transparent;
        content: '';

        @apply border-b-neutral-bright;
      }
    }

    &[data-form-control='invalid'] .helper {
      display: block;
    }
  }

  .label {
    display: flex;
    align-items: center;
    font-weight: 700;

    @apply text-base;

    @include xxs {
      @apply text-lg;
    }

    &::before {
      order: 1;
      content: ':';
    }
  }
</style>
