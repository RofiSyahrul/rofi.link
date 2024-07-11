<script lang="ts" context="module">
  import type { ColorMode } from '$/middleware/color-mode';

  import Switch from '$lib/components/switch.svelte';
  import type { SwitchOptionTuple } from '$lib/components/switch.svelte';

  const options: SwitchOptionTuple = [
    { label: 'Terang', value: 'light' },
    { label: 'Gelap', value: 'dark' },
  ];
</script>

<script lang="ts">
  import DarkIcon from '$lib/icons/dark-icon.svelte';
  import LightIcon from '$lib/icons/light-icon.svelte';

  export let activeValue: ColorMode;
</script>

<Switch {activeValue} label="Pilih Mode" name="colorMode" {options}>
  <svelte:fragment slot="option-label" let:option>
    <svelte:component
      this={option.value === 'light' ? LightIcon : DarkIcon}
    />
    <span class="visually-hidden">
      {option.label}
    </span>
  </svelte:fragment>
</Switch>
