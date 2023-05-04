import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/MoviesView.vue"),
    },
    {
      path: "/movies/:id",
      name: "movie",
      component: () => import("../views/MovieDetailsView.vue"),
      props:true
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/UserConnexionView.vue"),
      props:true
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/CreateUserView.vue"),
      props:true
    },
    {
      path: "/addMovie",
      name: "addMovie",
      component: () => import("../views/AddMovieView.vue"),
      props:true
    },
  ]
})

export default router
