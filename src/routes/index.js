import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'
import SignUp from '@/views/SignUp'
import LogIn from '@/views/Login'
import Home from '@/views/Home'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserProfile from '@/views/UserProfile'
import BookShow from '@/views/BookShow'
import GroupShow from '@/views/GroupShow'
import GroupNew from '@/views/GroupNew'
import SearchGroups from '@/views/SearchGroups'
import GroupSettings from '@/views/GroupSettings'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LogIn,
      // non-working logic to redirect fro login page
      // beforeEnter: (to, from, next) => {
      //   if (this.$store.getters.isAuthenticated) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/users/:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/books/:id',
      name: 'BookShow',
      component: BookShow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/:id/settings',
      name: 'UserProfileSettings',
      component: UserProfileSettings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups/new',
      name: 'GroupNew',
      component: GroupNew,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups/search',
      name: 'SearchGroups',
      component: SearchGroups,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups/:id',
      name: 'GroupShow',
      component: GroupShow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups/:id/settings',
      name: 'GroupSettings',
      component: GroupSettings,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    } else if (to.query.user) {
      console.log('in index.js isAuth is false', to)
      let user = JSON.parse(to.query.user)
      store.dispatch('setUser', user)
      next()
      return
    }
    location.replace('/LandingPage')
  } else {
    if (store.getters.isAuthenticated) {
      // no need to go to login page, if user is already logged in - redirect
      return router.push({ name: 'Home' });
    }
    return next()
  }
})

export default router
