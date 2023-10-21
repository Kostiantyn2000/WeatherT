<script setup>
import { useI18n } from 'vue-i18n'

const { t  } = useI18n({useScope: 'global'})
 
</script>

<script >
import BlockFavoriteWeather from "@/components/BlockFavoriteWeather.vue";
import { mapState, mapMutations, mapActions } from 'vuex';


export default {
    components: {
        BlockFavoriteWeather,
    },
    data() {
        return {
         cityName: '',
         isModalShowDelete: false,
        }
    },
    methods: {
        showModalDelete(state){
          this.isModalShowDelete = state.isShow
          this.cityName = state.cityName
        },
        ...mapMutations({
            setFavoriteWeatherCities: 'weather/setFavoriteWeatherCities'

        }),
        ...mapActions({
            getFavoriteWeatherCityDays: 'weather/getFavoriteWeatherCityDays',
        }),
        loadCitiesFavoriteWeather() {
            const favoritesWeatherCities = JSON.parse(localStorage.getItem('FavoriteWether'))
            favoritesWeatherCities !== null ?  this.setFavoriteWeatherCities(favoritesWeatherCities) : this.setFavoriteWeatherCities([])
            this.getFavoriteWeatherCityDays()
        },
    },
    computed: {
        ...mapState({
            favoritesWeatherCityDays: state => state.weather.favoritesWeatherCityDays,
            isWeatherForecast: state => state.weather.isWeatherForecast,
            favoritesWeatherCities: state => state.weather.favoritesWeatherCities,
        }),
    },
    mounted() {
        this.loadCitiesFavoriteWeather()
    },

    watch: {
        isWeatherForecast: {
            handler() {
                this.loadCitiesFavoriteWeather()
            },
            deep: true
        }
    }
}
</script>

<template>
    <div style="margin-bottom: 100px;">
    <button-custom @click="$router.push('/')" class="buttonDay">
        {{ $t('back') }}
    </button-custom>
    <div>
        <BlockFavoriteWeather v-if="favoritesWeatherCityDays.length > 0" v-for="weatherCity, index in favoritesWeatherCityDays" :key="index"
            :cityName="weatherCity.cityName" :idBlock="Number(index)" :name="weatherCity.cityName"
            :weather="weatherCity.weather" :main="weatherCity.main" :list="weatherCity.list"
            @update:show-modal-delete="showModalDelete"
            >
        </BlockFavoriteWeather>
        <div v-else class="wrapper-loading">
            <loading />
        </div>
    </div>
</div>
  <modal v-model:show="isModalShowDelete">
      <h4> {{ $t('delete-btn') }}  {{ cityName }} </h4>
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
