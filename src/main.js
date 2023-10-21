import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import router from './router/router'
import components from '@/components/core/index'
import store from '@/store'
import { languages, defaultLocale } from './i18n'
import { createI18n, useI18n } from 'vue-i18n'

const localeStorageLang =  localStorage.getItem('lang')
const messages = Object.assign(languages)
const i18n = createI18n({
   legacy: false,
   locale: localeStorageLang || defaultLocale,
   fallbackLocale: 'en',
   messages
})

const app = createApp(App, {
     setup() {
          const {t} = useI18n()
          return {t}
     }
})


components.forEach(element => {
     app.component(element.name, element)
});


app.use(i18n).use(store).use(router).mount('#app')
