import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import Print from '@/views/print/index.vue';
// import { useLogin } from '@/stores'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/print',
        component: Print,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    next()
    // NProgress.start()
    // if (to.path === '/login') {
    //     return next()
    // }
    // const { getUser } = useLogin()
    // // console.log(getUser())
    // try {
    //     await getUser()
    //     next()
    // } catch (err) {
    //     console.log(err)
    //     next('/login')
    // }
})

router.afterEach(() => {
    NProgress.done()
})

export default router
