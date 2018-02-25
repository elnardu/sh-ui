import Vue from 'vue'
import Router from 'vue-router'

import MainEditor from '@/components/MainEditor'
import GroupEditor from '@/components/GroupEditor'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Groups from '@/components/Groups'


import store from '../store'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/groups'
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: { requiresLogin: true }
    },
    {
      path: '/group/:id',
      name: 'GroupEditor',
      component: GroupEditor,
      props: true,
      meta: { requiresLogin: true }
    },
    {
      path: '/editor',
      name: 'MainEditor',
      component: MainEditor,
      meta: { requiresLogin: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.getters.isAuthenticated) {
    // You can use store variable here to access globalError or commit mutation
    next("/login")
  } else {
    next()
  }
})

export default router
