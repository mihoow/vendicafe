import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import CoffeeView from '../views/CoffeeView.vue'
import LoadingView from '../views/LoadingView.vue'

import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: MenuView,
        },
        {
          path: '/menu/:id',
          name: 'coffee-details',
          component: CoffeeView,
        },
        {
          path: '/menu/:id/loading',
          name: 'loading',
          component: LoadingView,
          beforeEnter: (to, _from, next) => {
            if (!store.order) {
              next(`/menu/${to.params.id}`)
            } else {
              next()
            }
          },
        },
      ],
    },
  ],
})

export default router
