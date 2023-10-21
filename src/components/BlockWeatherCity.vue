<script setup>
import { useI18n } from 'vue-i18n'

const { t  } = useI18n({useScope: 'global'})
 
</script>

<script>
 import WeatherItem from './WeatherItem.vue';
 import {mapMutations, mapState} from 'vuex';

export default {
   components: {
       WeatherItem,
    },
   props: {
      cityName: String,
      idBlock: Number,
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
    list: Array
   },
   methods: {
        ...mapMutations({
         setWeatherForecast: 'weather/setWeatherForecast',
         removeBlockWeather: 'weather/removeBlockWeather',
         addFavoriteWeather: 'weather/addFavoriteWeather',
        }),
        changeCurrentWeather() {
          this.setWeatherForecast(false)
        },
        changeWeatherForecast(){
         this.setWeatherForecast(true)
        },
        removeBlock() {``
          this.removeBlockWeather(this.idBlock)
          this.showModalDelete()
        },
        createFavoriteBlockWeather(){
         this.addFavoriteWeather(this.idBlock)
         this.showModalFavorite()
        },
        showModalDelete() {
            this.$emit('update:showModalDelete', {isShow: true, cityName: this.cityName})
        },
        showModalFavorite(){
         this.$emit('update:showModalFavorite', {isShow: true, cityName: this.cityName})
        },
    },
    computed:{
        ...mapState({
         isWeatherForecast: state => state.weather.isWeatherForecast
        }),
    }
}
</script>



<template>
   <div class="wrapper">   
      <div class="wrapper-btn">
         <h2 class="title">{{  cityName }}</h2>
         <button-custom @click="changeCurrentWeather" class="buttonDay">
            {{ $t("weather-day") }}
         </button-custom>
         <button-custom @click="changeWeatherForecast">
            {{ $t("weather-days")}}
         </button-custom>
         <button-custom style="margin-left: 20px;" @click="removeBlock">
           {{ $t('delete') }}
         </button-custom>
         <button-custom style="margin-left: 20px;" @click="createFavoriteBlockWeather">
            {{ $t('add-favorite') }}
         </button-custom>  
      </div>
      <div class="weather-list">
         <WeatherItem 
          v-if="isWeatherForecast"
          v-for="weatherDays in list"
          :name="cityName"
          :weather="weatherDays.weather"
          :main="weatherDays.main"
        />
        <WeatherItem v-else
          :name="cityName"
          :weather="weather"
          :main="main"
        />
     
   </div> 
   </div>
</template>




<style scoped>
.wrapper {
   margin-top: 50px;
   border: 1px solid #804040;
   max-width: 800px;
   height: 300px;
   padding: 20px;
}

.weather-list {
   overflow-y: hidden;
   height: 250px;
   display: flex;
   align-items: center;
}


.wrapper-btn {
   display: flex;
   align-items: center;
}

.title {
   margin-right: 10px;
}

.buttonDay {
   margin-right: 20px;
}
</style>