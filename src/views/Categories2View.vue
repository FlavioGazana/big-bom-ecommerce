<template>
  <section id="produtos" class="bg-amber-50 scroll-mt-20 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-amber-950 mb-6">
        Produtos em "{{ categoriaSelecionada }}"
      </h2>

      <div v-if="loading" class="text-center text-gray-600 py-12">
        Carregando produtos...
      </div>

      <div v-else>
        <div v-if="produtos.length === 0" class="text-center text-gray-600 py-12">
          Nenhum produto encontrado.
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="produto in produtos"
            :key="produto.id"
            class="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              :src="produto.thumbnail"
              :alt="produto.title"
              class="w-full h-40 object-cover rounded mb-3"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ produto.title }}
            </h3>
            <p class="text-red-700 font-bold mb-1">
              {{
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  produto.price
                )
              }}
            </p>
            <router-link
              :to="`/produto/${produto.id}`"
              class="text-sm text-red-700 hover:text-red-500 underline"
            >
              Ver Detalhes
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const produtos = ref([])
const loading = ref(true)
const route = useRoute()


const categoriaSelecionada = computed(() => {
  return route.query.categoria ? String(route.query.categoria) : ''
})


const carregarPorCategoria = async (slug) => {
  loading.value = true
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${encodeURIComponent(slug)}`
    )
    produtos.value = response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
    produtos.value = []
  } finally {
    loading.value = false
  }
}


watch(
  () => route.fullPath,
  () => {
    if (categoriaSelecionada.value) {
      carregarPorCategoria(categoriaSelecionada.value)
    } else {
      produtos.value = []
    }
  }
)


onMounted(() => {
  if (categoriaSelecionada.value) {
    carregarPorCategoria(categoriaSelecionada.value)
  }
})
</script>

<style scoped>

</style>

<!--SE VOCÊ CHEGOU ATÉ AQUI, É PORQUE MEU NOME É SAMARA E TENHO 12 ANOS, OU TERIA SE NÃO TIVESSE FEITO ESSE PROJETO, SE VOCÊ NÃO QUER SER AMALDIÇOADO PELO VUE.JS, REPASSE
ESSA MENSAGEM PARA PELO MENOS 10 PESSOAS OU SOFRA AS CONSEQUÊNCIAS-->