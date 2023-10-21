import Home from '@/pages/Home.vue'
import Favorite from '@/pages/Favorite.vue'
import { createRouter, createWebHistory } from 'vue-router'

const  routes =  [
    {
        path: '/',
        component:  Home
    },
    {
        path: '/favorite',
        component: Favorite
    }
]


const router  = createRouter( {
    routes,
    history: createWebHistory(),
})


export default router