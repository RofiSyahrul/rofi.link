<script lang="ts">
  import type { ComponentType } from 'svelte';

  import type { ColorMode } from '$/env';
  import * as m from '$/paraglide/messages';

  import Switch from '$lib/components/switch.svelte';
  import type {
    SwitchOption,
    SwitchOptionTuple,
  } from '$lib/components/switch.svelte';
  import DarkIcon from '$lib/icons/dark-icon.svelte';
  import LightIcon from '$lib/icons/light-icon.svelte';

  export let activeValue: ColorMode;

  interface ColorModeOption extends SwitchOption<ColorMode> {
    icon: ComponentType;
  }

  const options: SwitchOptionTuple<ColorModeOption> = [
    {
      icon: LightIcon,
      label: m.app_mode_option_light(),
      value: 'light',
    },
    {
      icon: DarkIcon,
      label: m.app_mode_option_dark(),
      value: 'dark',
    },
  ];
</script>

<Switch
  {activeValue}
  label={m.app_mode_select()}
  name="colorMode"
  {options}
>
  <svelte:fragment slot="option-label" let:option>
    <svelte:component this={option.icon} />
    <span class="visually-hidden">
      {option.label}
    </span>
  </svelte:fragment>
</Switch>
