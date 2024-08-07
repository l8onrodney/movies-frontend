import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: () => import('../views/Movie.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;