<script lang="ts">
  export let checked = false;
  export let inputType: 'radio' | 'checkbox' = 'radio';
  export let label: string;
  export let name: string;
  export let required = false;
  export let value: string;
</script>

<label>
  <input type={inputType} {checked} {required} {name} {value} />
  <span>
    {label}
  </span>
</label>

<style lang="scss">
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: -1px;
    padding: 2px;
    overflow: hidden;
  }

  span {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 36px;
    padding: 4px 12px;
    text-align: center;
    background-color: transparent;
    border-radius: 32px;
    cursor: pointer;
    user-select: none;

    @apply text-xs text-neutral-dim border border-solid border-neutral-dim;

    @include xxs {
      @apply text-base;
    }
  }

  input {
    position: absolute;
    left: -9em;

    &:focus-visible + span {
      @apply outline outline-1 outline-neutral-dim outline-offset-1;
    }

    &:hover + span {
      filter: brightness(0.6);
    }

    &:checked + span {
      @apply text-neutral-bright bg-neutral-dim;
    }

    &:checked:hover + span {
      filter: brightness(0.8);
    }
  }
</style>
