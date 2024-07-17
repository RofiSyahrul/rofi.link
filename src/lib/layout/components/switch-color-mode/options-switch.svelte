<script lang="ts">
  import type { ColorMode } from '$/env';
  import * as m from '$/paraglide/messages';

  import Switch from '$lib/components/switch.svelte';
  import type { SwitchOptionTuple } from '$lib/components/switch.svelte';
  import DarkIcon from '$lib/icons/dark-icon.svelte';
  import LightIcon from '$lib/icons/light-icon.svelte';

  export let activeValue: ColorMode;

  const options: SwitchOptionTuple = [
    { label: m.app_mode_option_light(), value: 'light' },
    { label: m.app_mode_option_dark(), value: 'dark' },
  ];
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
