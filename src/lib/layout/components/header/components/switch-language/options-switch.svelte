<script lang="ts">
  import * as m from '$/paraglide/messages';
  import type { AvailableLanguageTag } from '$/paraglide/runtime';

  import Switch from '$lib/components/switch.svelte';
  import type {
    SwitchOption,
    SwitchOptionTuple,
  } from '$lib/components/switch.svelte';

  export let activeValue: AvailableLanguageTag;

  interface SwitchLanguageOption
    extends SwitchOption<AvailableLanguageTag> {
    flag: '🇮🇩' | '🇺🇸';
  }

  const options: SwitchOptionTuple<SwitchLanguageOption> = [
    {
      flag: '🇮🇩',
      label: 'Bahasa Indonesia',
      value: 'id',
    },
    {
      flag: '🇺🇸',
      label: 'English (US)',
      value: 'en',
    },
  ];
</script>

<Switch
  {activeValue}
  label={m.app_lang_change()}
  name="lang"
  {options}
>
  <svelte:fragment slot="option-label" let:option>
    {option.flag}
    <span class="visually-hidden">
      {option.label}
    </span>
  </svelte:fragment>
</Switch>
