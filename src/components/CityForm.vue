<script>
import { mapState, mapMutations, mapGetters } from 'vuex'


export default {
    data() {
        return {
            city: ""
        }
    },
    methods: {
        ...mapMutations({
            createCities: 'weather/createCities'
        }),
        createCity() {
            this.createCities(this.city)
            this.city = ''
        }
    },
    computed:{
        ...mapState({
            cities: state => state.weather.cities
        }),
    }
}
</script>


<template>
    <form @submit.prevent class="wrapper">
        <input v-model="city" type="text" placeholder="Місто" />
        <button-custom @click="createCity">Cтворити блок погоди за містом</button-custom>
    </form>
</template>



<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
}
</style>
