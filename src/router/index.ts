import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView/ProjectsView.vue')
    },
    {
      path: '/projects/:id',
      name: 'projectDetails',
      component: () => import('../views/ProjectDetailsView/ProjectDetailsView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientsView/ClientsView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
