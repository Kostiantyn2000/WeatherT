<template>
    <div v-if="show" class="modal" @click.stop="hideModal">
      <div @click.stop class="modal-content">
        <button @click="hideModal" class="close-button">Закрити</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script >
   export default {
      name: 'modal',
      props: {
        show: {
            type: Boolean, 
            default: false
        }
      },
      methods: {
         hideModal() {
            this.$emit('update:show', false)
         }
      }

   }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .close-button {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    width: 176%;
  }
  </style>
  