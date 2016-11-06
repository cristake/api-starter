<template>
  <span class="help-block alert alert-danger">
    <!-- this will be replaced by the error messages -->
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'form-error',

    props: ['errors']
  }
</script>
