import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ProductsListView from '../views/ProductsListView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import CategoriesView from '@/views/CategoriesView.vue';
import Categories2View from '@/views/Categories2View.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/produtos',
    name: 'Produtos',
    component: ProductsListView
  },

  {
    path: '/produto/:id',
    name: 'Produto' ,
    component: ProductDetailView

  },

  { path: '/categorias', 
    name: 'Categorias', 
    component: CategoriesView },

    { path: '/categorias2', 
    name: 'Categoria', 
    component: Categories2View }

 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;