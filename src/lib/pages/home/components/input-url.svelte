<script lang="ts" context="module">
  import { ACTUAL_URL_PATTERN } from '$/actions/url/constants.server';
  import * as m from '$/paraglide/messages';

  import FormControl from '$lib/components/form-control.svelte';
</script>

<script lang="ts">
  export let invalid = false;
  export let value = '';
</script>

<FormControl
  alwaysVisibleHelper
  {invalid}
  label={m.input_actual_url_label()}
  helperText={m.input_actual_url_helper()}
>
  <input
    autocorrect="on"
    data-field
    data-invalid-value={invalid ? value : undefined}
    name="actualURL"
    pattern={ACTUAL_URL_PATTERN}
    placeholder={m.input_actual_url_placeholder()}
    required
    type="url"
    {value}
  />
</FormControl>
