<script lang="ts">
  import clsx from 'clsx';

  let className = '';
  export { className as class };

  export let alwaysVisibleHelper = false;
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
  title={alwaysVisibleHelper ? '' : parsedHelperText}
>
  <div class="label">
    {label}
  </div>

  <slot />

  {#if parsedHelperText}
    <div
      class="helper"
      data-helper={alwaysVisibleHelper ? 'visible' : ''}
    >
      {parsedHelperText}
    </div>
  {/if}
</svelte:element>

<style lang="scss">
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

  .helper {
    visibility: hidden;

    @apply text-xs text-neutral-dim1;

    &[data-helper='visible'] {
      visibility: visible;
    }
  }

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

    :global(input) {
      &::-webkit-input-placeholder,
      &::-moz-placeholder,
      &::placeholder {
        @apply text-neutral-dim1;
      }
    }

    :global([data-field]) {
      display: flex;
      align-items: center;
      width: 100%;
      height: 48px;
      padding: 0 12px;
      border: 2px solid transparent;
      border-radius: 4px;

      @apply bg-neutral-bright1;

      &:focus-within {
        @apply border-primary-dim;
      }
    }

    :global([data-field='wrapper']) {
      padding-right: 0;

      :global(input) {
        width: 100%;
        height: 100%;
        padding: 0 12px 0 4px;
        background: inherit;
      }
    }

    &[data-form-control='invalid'] {
      :global([data-field]) {
        @apply border-danger-dim1;

        &:focus-within {
          @apply bg-danger-bright;
        }
      }

      .helper {
        visibility: visible;
        @apply text-danger-dim;
      }
    }
  }

  @include dark {
    .helper {
      @apply text-neutral-bright1;
    }

    .form-control {
      &.required .label::after,
      &[data-form-control='invalid'] .helper {
        @apply text-danger-bright;
      }

      :global(input) {
        &::-webkit-input-placeholder,
        &::-moz-placeholder,
        &::placeholder {
          @apply text-neutral-bright1;
        }
      }

      :global([data-field]) {
        @apply bg-neutral-dim1;

        &:focus-within {
          @apply border-primary-bright;
        }
      }

      &[data-form-control='invalid'] :global([data-field]) {
        @apply border-danger-bright1;

        &:focus-within {
          @apply bg-danger-dim;
        }
      }
    }
  }
</style>
