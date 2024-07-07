<script lang="ts" context="module">
  import {
    SLUG_HELPER_MESSAGE,
    SLUG_PATTERN,
  } from '$/actions/url/constants.server';

  import FormControl from '$lib/components/form-control.svelte';

  const siteURL = new URL(import.meta.env.SITE);
  const siteHost = siteURL.host;
</script>

<script lang="ts">
  export let invalid = false;
  export let value = '';
</script>

<FormControl
  alwaysVisibleHelper
  {invalid}
  label="Singkatnya"
  helperText={SLUG_HELPER_MESSAGE}
>
  <div data-field="wrapper">
    <span>{siteHost}/</span>
    <input
      autocomplete="off"
      data-invalid-value={invalid ? value : undefined}
      name="slug"
      pattern={SLUG_PATTERN}
      placeholder="slug"
      required
      type="text"
      {value}
    />
  </div>
</FormControl>
