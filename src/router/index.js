import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MusicView from '@/views/MusicView.vue'
import TripView from '@/views/TripView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {path: '/', name:"loginview", component: LoginView},
{
  path:'/main', name:'mainview',component: MainView,
  children:[
    {path: 'music', name:'musicview', component: MusicView},

    {path: 'trip', name:'tripview', component: TripView},
  ]
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
