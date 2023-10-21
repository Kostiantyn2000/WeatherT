<template>
    <input
      :value="value"
      :class="inputClass"
      @input="updateInput"
    />
  </template>
  
  <script>
  export default {
    name: 'input',
    props: {
        value: [ String, Number]
    },
    methods: {
      updateInput(event) {
      this.$emit('update:model-value', event.target.value)
      }
    },
  };
  </script>
  
  <style scoped>
  .custom-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  </style>
  