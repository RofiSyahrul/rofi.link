<script lang="ts" context="module">
  import FormControl from '$lib/components/form-control.svelte';
</script>

<script lang="ts">
  export let invalid = false;
  export let value = '';
</script>

<FormControl
  alwaysVisibleHelper
  {invalid}
  label="Tautan asli"
  helperText="Tautan harus valid. Contoh: https://example.com"
>
  <input
    autocorrect="on"
    data-field
    data-invalid-value={invalid ? value : undefined}
    name="actualURL"
    pattern="https?:\/\/.+\..+"
    placeholder="Tautan yang akan disingkat"
    required
    type="url"
    {value}
  />
</FormControl>
