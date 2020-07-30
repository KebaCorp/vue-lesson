import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '@/helpers/Authorization'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: { name: 'notFound' }
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "notFound" */ '@/components/errors/NotFound')
    },
    {
      path: '/',
      name: 'main',
      redirect: { name: 'heroes' },
      component: () => import(/* webpackChunkName: "main" */ '@/components/main/Main'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/components/authorization/Login')
    },
    {
      path: '/hero',
      name: 'hero',
      component: () => import(/* webpackChunkName: "hero" */ '@/components/hero/Hero'),
      children: [
        {
          path: '/hero/:id',
          name: 'heroView',
          component: () => import(/* webpackChunkName: "heroView" */ '@/components/hero/HeroView')
        },
        {
          path: '/heroes',
          name: 'heroes',
          component: () => import(/* webpackChunkName: "heroes" */ '@/components/hero/Heroes')
        },
        {
          path: '/hero/create',
          name: 'heroCreate',
          component: () => import(/* webpackChunkName: "heroCreate" */ '@/components/hero/HeroCreate'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

/**
 * Действия перед переходом по роуту.
 */
router.beforeEach((to, from, next) => {
  const isAuthorized = Authorization.isAuthorized()

  if (isAuthorized && to.name === 'login') {
    next({ name: 'notFound' })
  } else if (!isAuthorized && to.matched.some(record => record.meta.requiresAuth)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
