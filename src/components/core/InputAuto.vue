<template>
    <div>
      <input
         type="text"
         :value="modelValue"
         @input="updateInput"
      />
      <div v-if="showSuggestions" class="suggestions">
        <ul>
          <li v-for="suggestion in filteredSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent} from "vue"; 
  
  export default defineComponent({
    name: 'input-auto',
    props: { 
      modelValue: [String, Number],
       cities: Array,
    },
    data() {
      return {
        showSuggestions: false,
      };
    },
    computed: {
      filteredSuggestions() {
        return this.cities.filter(city =>
          city.toLowerCase().includes(this.modelValue.toLowerCase())
        );
      },
    },
    methods: {
      updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
      this.showSuggestions = true;
    },
      selectSuggestion(suggestion: string) {
        this.$emit('update:modelValue', suggestion)
        this.showSuggestions = false;
      },
    },
  });
  </script>
  
  <style scoped>
  .suggestions {
    position: absolute;
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    z-index: 1;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 5px;
    cursor: pointer;
  }
  
  li:hover {
    background-color: #eee;
  }
  </style>
  