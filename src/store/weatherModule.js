import axios from 'axios';

export const weatherModule = {
    state: () => ({
        cities: [],
        isLoading: false,
        weatherCityDays: [],
        isWeatherForecast: false,
        searchCityName: '',
        favoritesWeatherCities: [],
        favoritesWeatherCityDays: [],
        chartWeatherTemp: [],
        chartDays: [],
    }),
    mutations: {
        createCities(state, city) {
            if (state.cities.length <= 4) state.cities.push(city)
        },
        setLoading(state, loading) {
            state.isLoading = loading
        },
        setWeatherCityDays(state, weather) {
            state.weatherCityDays.push(weather)
        },
        removeWeatherCityDays(state) {
            state.weatherCityDays = []
        },
        removeBlockWeather(state, idx) {
            state.cities = state.cities.filter((el, index) => index !== idx)
        },
        setWeatherForecast(state, weatherForecast) {
            state.isWeatherForecast = weatherForecast
        },
        setSearchCityName(state, cityName) {
            state.searchCityName = cityName
        },
        addFavoriteWeather(state, idx) {
            const blockWeather = state.weatherCityDays.find((el, index) => index === idx)
            if (state.favoritesWeatherCities.length <= 4) {
            localStorage.setItem('FavoriteWether', JSON.stringify([...state.favoritesWeatherCities, blockWeather.cityName]))
            state.favoritesWeatherCities.push(blockWeather.cityName)
            }
        },
        setFavoriteWeather(state, favoritesWether) {
            state.favoritesWeatherCityDays.push(favoritesWether)
        },
        setFavoriteWeatherCities(state, favoritesWetherCities) {
            state.favoritesWeatherCities = favoritesWetherCities
        },
        removeFavoriteWeatherBlock(state, date ) {
            const blocksWeather = date.favoriteCities?.filter((el, index) => index !==  date.idBlock)
            const blocksWeatherFavorite = date.favoriteWeather?.filter((el, index) => index !== date.idBlock)
            localStorage.setItem('FavoriteWether', JSON.stringify(blocksWeather))
            state.favoritesWeatherCities = blocksWeather
            state.favoritesWeatherCityDays = blocksWeatherFavorite
        },
        removeFavoriteWeather(state) {
            state.favoritesWeatherCityDays = []
        },
        setCityUser(state, city) {
           state.cities = [city]
        },
        setChartWeather(state, weather) {
            let days = weather.list.map((el) =>  `${new Date(el.dt_txt).getDate()}.${new Date(el.dt_txt).getMonth() + 1}|${new Date(el.dt_txt).getHours()}:${new Date(el.dt_txt).getMinutes()}`)
            let temps = weather.list.map((el) => el.main.temp ) 
            localStorage.setItem('Chart', JSON.stringify({ days, temps, }))   
            state.chartDays = days
            state.chartWeatherTemp = temps
        },
    },
    getters: {
        filterCitiesWeather(state) {
            return state.weatherCityDays?.filter((item) => {
                return item?.cityName?.toLowerCase().includes(state?.searchCityName?.toLowerCase());
            });
        },
    },
    actions: {
        async getUserLocation({ commit}) {
            try {
                const apiKey = "03f8967e9dfc3e"
                const res = await axios.get(`https://ipinfo.io?token=${apiKey}`)
                const data = res.data;
                commit('setCityUser', data.city)    
            } catch (error) {
                console.log(error);
            }     
          },
        async getWeatherCityDays({ state, commit}) {
            try {
                commit('removeWeatherCityDays')
                commit('setLoading', true)
                const url = import.meta.env.VITE_HTTP_URL
                const apiKey = import.meta.env.VITE_API_KEY
                const localeStorageLang =  localStorage.getItem('lang')
                for (const city of state.cities) {
                    const resCity = await axios.get(`${url}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
                    const cityInfo = resCity.data
                    const res = state.isWeatherForecast ?
                        await axios.get(`${url}/data/2.5/forecast?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${apiKey}&units=metric&lang=${localeStorageLang}`)
                        : await axios.get(`${url}/data/2.5/weather?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${apiKey}&units=metric&lang=${localeStorageLang}`)
                    commit('setWeatherCityDays', { ...res.data, cityName: cityInfo[0].local_names[localeStorageLang] })
                }
            } catch (error) {
                console.log(error);
            } finally {
                commit('setLoading', false)
            }
        },
        async getFavoriteWeatherCityDays({ state, commit}) {
            try {
                commit('setLoading', true)
                commit('removeFavoriteWeather')
                const url = import.meta.env.VITE_HTTP_URL
                const apiKey = import.meta.env.VITE_API_KEY
                const localeStorageLang =  localStorage.getItem('lang')
                for (const city of state.favoritesWeatherCities) {
                    const resCity = await axios.get(`${url}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
                    const cityInfo = resCity.data
                    const res = state.isWeatherForecast ?
                        await axios.get(`${url}/data/2.5/forecast?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${apiKey}&units=metric&lang=${localeStorageLang}`)
                        : await axios.get(`${url}/data/2.5/weather?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${apiKey}&units=metric&lang=${localeStorageLang}`)
                    commit('setFavoriteWeather', { ...res.data, cityName: cityInfo[0].local_names[localeStorageLang] })
                }
            } catch (error) {
                console.log(error);
            } finally {
                commit('setLoading', false)
            }
        },  

        async  getChartCityDays({ state, commit}) {
            try {
                commit('setLoading', true)
                commit('removeWeatherCityDays')
                const url = import.meta.env.VITE_HTTP_URL
                const apiKey = import.meta.env.VITE_API_KEY
                    const resCity = await axios.get(`${url}/geo/1.0/direct?q=${state?.cities[0]}&limit=1&appid=${apiKey}`)
                    const cityInfo = resCity.data
                    const res = await axios.get(`${url}/data/2.5/forecast?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${apiKey}&units=metric`)
                    commit('setChartWeather', { ...res.data })
            } catch (error) {
                console.log(error);
            } finally {
                commit('setLoading', false)
            }
        },  

    },
    namespaced: true
}