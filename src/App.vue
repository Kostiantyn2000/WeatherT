<script setup >
</script>

<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>

.app-container {
  max-width: 1200px;
  margin: 0 auto; 

  min-width: 360px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .app-container {
    padding: 20px;
  }
}

</style>
