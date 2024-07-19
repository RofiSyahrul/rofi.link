<script lang="ts" context="module">
  export interface SwitchOption<
    TValue extends string | number = string | number,
  > {
    label: string;
    value: TValue;
  }

  export type SwitchOptionTuple<
    T extends SwitchOption = SwitchOption,
  > = [T, T];
</script>

<script lang="ts">
  // eslint-disable-next-line no-undef
  type V = $$Generic<string | number>;
  // eslint-disable-next-line no-undef
  type T = $$Generic<SwitchOption<V>>;

  export let activeValue: string | number | undefined = undefined;
  export let label: string | undefined = undefined;
  export let name: string;
  export let options: SwitchOptionTuple<T>;
</script>

<fieldset>
  {#if label}
    <legend class="visually-hidden">{label}</legend>
  {/if}

  {#each options as option, i (option.value)}
    <label>
      <input
        {name}
        type="radio"
        value={option.value}
        checked={activeValue ? option.value === activeValue : i === 0}
      />
      <span title={option.label}>
        <slot name="option-label" {option}>
          {option.label}
        </slot>
      </span>
    </label>
  {/each}
</fieldset>

<style lang="scss">
  fieldset {
    position: relative;
    display: flex;
    align-items: stretch;
    min-height: 28px;
    margin: 0;
    padding: 0;
    border: 1px solid;
    border-radius: 30px;

    @apply border-neutral-bright2;
  }

  label {
    width: 50%;
    min-width: 36px;
  }

  input {
    display: none;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 28px;
    padding: 0 4px;
    text-align: center;
    cursor: pointer;

    @apply text-lg text-neutral-dim;
  }

  input:checked + span {
    font-weight: 600;
    border: 1px solid;
    border-radius: 54px;
    cursor: default;

    @apply text-primary-dim bg-primary-bright border-primary-dim;
  }

  @include dark {
    fieldset {
      @apply border-neutral-dim2;
    }

    span {
      @apply text-neutral-bright0;
    }

    input:checked + span {
      @apply text-primary-bright bg-primary-dim border-primary-bright;
    }
  }
</style>
