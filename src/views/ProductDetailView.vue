<template>
  <section class="bg-amber-50  py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="produto" class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex flex-col md:flex-row gap-6">
          <img :src="produto.thumbnail" :alt="produto.title" class="w-full md:w-1/2 rounded-lg object-cover">
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-amber-950 mb-3">{{ produto.title }}</h2>
            <p class="text-red-700 text-xl font-bold mb-2">R$ {{ produto.price }}</p>
            <p class="text-gray-700 mb-4">{{ produto.description }}</p>
            <p class="text-sm text-gray-600 mb-2">Categoria: {{ produto.category }}</p>
            <p class="text-sm text-gray-600 mb-2">Disponibilidade: {{ produto.stock > 0 ? 'Em estoque' : 'Indisponível' }}</p>
            <button class="mt-4 px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">Carregando produto...</div>
    </div>
  </section>
  <div>
    <ProductComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ProductComponent from '@/components/ProductComponent.vue';

const route = useRoute();
const produto = ref(null);

const carregarProduto = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    produto.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
  }
};

onMounted(carregarProduto);
</script>