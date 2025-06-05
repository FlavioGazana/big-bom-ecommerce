<template>
    <section id="produtos" class="bg-amber-50 scroll-mt-20 min-h-screen py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h2 class="text-3xl font-bold text-amber-950 mb-6">
                {{ tituloSecao }}
            </h2>


            <div v-if="loading" class="text-center text-gray-600 py-12">
                Carregando produtos...
            </div>

            <div v-else>

                <div v-if="produtos.length === 0" class="text-center text-gray-600 py-12">
                    Nenhum produto encontrado.
                </div>


                <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div v-for="produto in produtos" :key="produto.id"
                        class="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
                        <img :src="produto.thumbnail" :alt="produto.title"
                            class="w-full h-40 object-cover rounded mb-3" />
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
                        <router-link :to="`/produto/${produto.id}`"
                            class="text-sm text-red-700 hover:text-red-500 underline">
                            Ver Detalhes
                        </router-link>
                    </div>
                </div>


                <div v-if="!categoriaSelecionada && !searchSelecionado" class="mt-6 flex justify-center space-x-2">
                    <button @click="pagina--" :disabled="pagina === 1"
                        class="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 disabled:bg-gray-400">
                        Anterior
                    </button>
                    <button @click="pagina++" class="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600">
                        Próxima
                    </button>
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
const pagina = ref(1)

const route = useRoute()


const categoriaSelecionada = computed(() =>
    route.query.categoria ? String(route.query.categoria) : ''
)
const searchSelecionado = computed(() =>
    route.query.search ? String(route.query.search) : ''
)


const tituloSecao = computed(() => {
    if (searchSelecionado.value) {
        return `Resultado de "${searchSelecionado.value}"`
    }
    if (categoriaSelecionada.value) {
        return `Produtos em "${categoriaSelecionada.value}"`
    }
    return 'Nossos Produtos'
})


const carregarTodosProdutos = async () => {
    loading.value = true
    try {
        const limite = 8
        const skip = (pagina.value - 1) * limite
        const response = await axios.get(
            `https://dummyjson.com/products?limit=${limite}&skip=${skip}`
        )
        produtos.value = response.data.products
    } catch (error) {
        console.error('Erro ao buscar todos os produtos:', error)
        produtos.value = []
    } finally {
        loading.value = false
    }
}


const carregarProdutosPorCategoria = async (slug) => {
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


const carregarProdutosPorBusca = async (termo) => {
    loading.value = true
    try {
        const response = await axios.get(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(termo)}`
        )
        produtos.value = response.data.products
    } catch (error) {
        console.error('Erro ao buscar produtos por busca:', error)
        produtos.value = []
    } finally {
        loading.value = false
    }
}


const buscarProdutos = () => {
    if (searchSelecionado.value) {
        carregarProdutosPorBusca(searchSelecionado.value)
    } else if (categoriaSelecionada.value) {
        carregarProdutosPorCategoria(categoriaSelecionada.value)
    } else {
        carregarTodosProdutos()
    }
}


watch(
    () => route.fullPath,
    () => {
        pagina.value = 1
        buscarProdutos()
    }
)


watch(pagina, (novaPg) => {
    if (!searchSelecionado.value && !categoriaSelecionada.value) {
        carregarTodosProdutos()
    }
})


onMounted(buscarProdutos)
</script>

<style scoped></style>
