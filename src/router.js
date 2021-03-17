import { createRouter, createWebHistory } from 'vue-router';

import DocsLayout from '@/views/DocsLayout';
import NotFoundView from '@/views/NotFound.view.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'section',
    },
  },

  // Docs routes
  {
    path: '/:section?/:article?',
    name: 'section',
    component: DocsLayout,
    props: route => {
      return {
        section: route.params.section,
        article: route.params.article
      }
    },
    // pathToRegexpOptions: { strict: false },
    // beforeEnter: (to, from, next) => {
    //   if (sessionStorage.getItem('redirect') !== null) {
    //     const redirect = sessionStorage.redirect;
    //     delete sessionStorage.redirect;
    //     next(redirect);
    //   } else {
    //     next();
    //   }
    // },
  },

  // Routes not found - 404
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
