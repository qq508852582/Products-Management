import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/components/layout/BasicLayout.vue';
import BlankLayout from '@/components/layout/BlankLayout.vue';
import ProductList from '@/views/product/list/index.vue';
import Other0 from '@/views/other/Other_0.vue';
import Other1 from '@/views/other/Other_1.vue';
import ProductDetail from '@/views/product/detail/index.vue';
import ProductEdit from '@/views/product/edit/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    children: [
      {
        path: '/',
        redirect: '/products',
      },
      {
        path: '/products',
        component: BlankLayout,
        children: [
          {
            path: '/products',
            component: ProductList,
          },
          {
            path: '/products/add',
            component: ProductEdit,
          },
          {
            path: '/products/:id',
            component: ProductDetail,
          },
          {
            path: '/products/:id/edit',
            component: ProductEdit,
          },
        ],
      },
      {
        path: '/other/0',
        component: Other0,
      },
      {
        path: '/other/1',
        component: Other1,
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
