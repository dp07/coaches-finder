import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import CoachContact from './pages/requests/CoachContact.vue';
import RequestReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: CoachesList,
        },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: CoachContact,
                }
            ]
        },
        {
            path: '/register',
            component: CoachRegistration,
            meta: { login: true },
        },
        {
            path: '/request',
            component: RequestReceived,
            meta: { login: true },
        },
        {
            path: '/auth',
            component: UserAuth,
            meta: { notLogin: true },
        },
        {
            path: '/:notFound(.*)',
            component: NotFound,
        },
    ],
});

router.beforeEach((to, _, next) => {
    if(to.meta.login && !store.getters.isAuthenticate){
        next('/auth');
    } else if(to.meta.notLogin && store.getters.isAuthenticate){
        next('/coaches');
    } else {
        next();
    }
});

export default router;