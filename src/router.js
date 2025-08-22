import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './components/coaches/CoachDetail.vue'
import CoachesList from './components/coaches/CoachesList.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import CoachContact from './components/requests/CoachContact.vue';
import RequestReceived from './components/requests/RequestsReceived.vue';
import NotFound from './components/NotFound.vue';

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
        },
        {
            path: '/request',
            component: RequestReceived,
        },
        {
            path: '/:notFound(.*)',
            component: NotFound,
        },
    ],
});

export default router;