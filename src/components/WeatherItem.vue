<template>
  <div class="weather-card">
    <h2 class="city-name">{{ name }}</h2>
    <div class="weather-info">
      <div class="weather-icon">
        <img :src="`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`" :alt="weather[0].description" />
      </div>
      <div class="temperature">{{ main?.temp }}°C</div>
    </div>
  </div>
</template>
  
<script  >
export default {
  props: {
    name: String,
    weather: Array,
    main: {
      feels_like: Number,
      humidity: Number,
      pressure: Number,
      temp: Number,
      temp_max: Number,
      temp_min: Number,
    },
  }
}
</script>
  
<style scoped>
.weather-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 200px;
  display: inline-block;
  text-align: center;
}

.city-name {
  font-size: 1.2em;
  font-weight: bold;
}

.weather-info {
  margin-top: 10px;
}

.weather-icon img {
  width: 80px;
  height: 80px;
}

.temperature {
  font-size: 1.5em;
  margin-top: 5px;
}

.description {
  font-size: 1em;
  margin-top: 5px;
}
</style>
  