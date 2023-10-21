<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({useScope: 'global'})

const  switchLang = () => {
    locale.value === 'en' ? locale.value = 'uk' : locale.value = 'en'
    localStorage.setItem('lang', locale.value)
};
 
</script>
<script  >
import ChartWeather from "@/components/ChartWeather.vue";
import BlockWeatherCity from "@/components/BlockWeatherCity.vue";
import CityForm from "@/components/CityForm.vue";
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {
    setup(props) {
        
    },
    components: {
        ChartWeather,
        BlockWeatherCity,
        CityForm,
    },
    data() {
        return {
         isModalShow: false,
         isModalShowDelete: false,
         isModalShowFavorite: false,
         cityName: '',
        }
    },
    methods: {
        showModalDelete(state){
          this.isModalShowDelete = state.isShow
          this.cityName = state.cityName
        },
        showModalFavorite(state){
          this.isModalShowFavorite = state.isShow
          this.cityName = state.cityName
        },
        showModal() {
            this.isModalShow = true
        },
        ...mapActions({
            getWeatherCityDays: 'weather/getWeatherCityDays',
            getUserLocation: 'weather/getUserLocation',
            getChartCityDays: 'weather/getChartCityDays'
        }),
        ...mapMutations({
            setSearchCityName: 'weather/setSearchCityName',
            setFavoriteWeatherCities: 'weather/setFavoriteWeatherCities',
        }),
    },
    computed: {
        ...mapState({
            weatherCityDays: state => state.weather.weatherCityDays,
            cities: state => state.weather.cities,
            isWeatherForecast: state => state.weather.isWeatherForecast,
            searchCityName: state => state.weather.searchCityName,
            favoritesWeatherCities: state => state.weather.favoritesWeatherCities,
            chartWeatherTemp: state => state.weather.chartWeatherTemp,
            chartDays: state => state.weather.chartDays,
        }),
        ...mapGetters({
            filterCitiesWeather: 'weather/filterCitiesWeather'
        }),
    },
    mounted() {
        this.getUserLocation()
    },

    watch: {
        cities: {
            handler() {
               this.getWeatherCityDays()
               this.getChartCityDays()
            },
            deep: true
        },
        isWeatherForecast: {
            handler() {
                this.getWeatherCityDays()
            },
            deep: true
        },
    }


}
</script>

<template>
    <div>
        <div class="wrapper-button">
            <input-auto :model-value="searchCityName" :cities="cities" @update:model-value="setSearchCityName"/>
            <button-custom @click="$router.push('/favorite')" class="button">{{ $t('favorite') }}</button-custom>
        </div>
        <div style='margin-top: 30px;'>
            <button-custom @click="showModal">
                {{ $t('create-favorite') }}
            </button-custom>
        </div>
        <div style='margin-top: 30px;'>
            <button-custom @click="switchLang">
               {{ $t('lang-btn') }}
            </button-custom>
        </div>

        <BlockWeatherCity v-if="filterCitiesWeather.length > 0" v-for="weatherCity, index in filterCitiesWeather" :key="index"
            :cityName="weatherCity.cityName" :idBlock="Number(index)" :name="weatherCity.cityName"
            :weather="weatherCity.weather" :main="weatherCity.main" :list="weatherCity.list"
             @update:show-modal-delete="showModalDelete"
             @update:show-modal-favorite="showModalFavorite"
            >
        </BlockWeatherCity>
        <div v-else class="wrapper-loading">
            <loading />
        </div>
        <ChartWeather  />
    </div>
    <modal v-model:show="isModalShow">
        <CityForm />
    </modal>
    <modal v-model:show="isModalShowDelete">
      <h4> {{ $t('delete-btn') }}  {{ cityName }} </h4>
   </modal>
   <modal v-if="favoritesWeatherCities.length <= 4" v-model:show="isModalShowFavorite">
      <h4> {{ $t('block-to-favorites') }} {{ cityName }} </h4>
   </modal> 
   <modal v-else v-model:show="isModalShowFavorite">
      <h4> {{ $t("maximum-favorites")}} 5</h4>
   </modal>
</template>


<style>
.wrapper-button {
    display: flex;
    align-items: center;
}

.button {
    margin-left: 30px;
}

.wrapper-loading {
    display: grid;
    place-items: center;
}
</style>
