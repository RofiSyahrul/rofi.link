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
      content: '*';
      color: var(--color-danger-dim);
      order: 2;
      margin-left: 2px;
    }

    .helper {
      position: absolute;
      top: 100%;
      right: 4px;
      z-index: 1;
      display: none;
      max-width: 90%;
      padding: 8px;
      margin-top: -4px;
      border-radius: 4px;
      background-color: var(--color-neutral-bright);
      color: var(--color-danger-dim);
      box-shadow: var(--shadow-low);
      z-index: 10;

      &::before {
        position: absolute;
        bottom: 100%;
        right: 8px;
        content: '';
        border: 6px solid transparent;
        border-bottom-color: var(--color-neutral-bright);
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
      content: ':';
      order: 1;
    }
  }
</style>
