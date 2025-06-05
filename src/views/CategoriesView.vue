<template>
    <section class="py-12 scroll-mt-20 bg-amber-50" id="categorias">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-amber-950 mb-2">
                    Sua Jornada Tech Começa Aqui: Explore Nossas Categorias
                </h2>
                <p class="text-base text-gray-800 max-w-2xl mx-auto">
                    Celulares, PCs, fones de ouvido e muito mais – tudo organizado para facilitar sua escolha.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <router-link v-for="(cat, index) in categoriasExibicao" :key="index"
                    :to="`/categorias2?categoria=${encodeURIComponent(cat.slug)}`"
                    class="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div class="w-full h-40 bg-gray-200 overflow-hidden">
                        <img v-if="cat.imageUrl" :src="cat.imageUrl" :alt="cat.name"
                            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
                            Sem imagem
                        </div>
                    </div>

                    <div class="relative p-3">
                        <h3 class="text-xl font-semibold text-amber-950 mb-1 capitalize">
                            {{ cat.name }}
                        </h3>
                        <p class="text-gray-600 text-sm">
                            {{ gerarDescricao(cat.name) }}
                        </p>
                    </div>
                </router-link>
            </div>

            <div v-if="loading" class="text-center text-gray-600 mt-6">
                Carregando categorias...
            </div>
            <div v-else-if="!categoriasExibicao.length" class="text-center text-gray-600 mt-6">
                Nenhuma categoria encontrada.
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categoriasRaw = ref([])
const categoriasExibicao = ref([])
const loading = ref(true)

const capitalize = (s) => {
    if (typeof s !== 'string' || !s.length) return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const normalizeCategory = (raw) => {
    if (typeof raw === 'string') {
        return { slug: raw, name: capitalize(raw) }
    }
    if (raw.slug && raw.name) {
        return { slug: raw.slug, name: raw.name }
    }
    const fallback = String(raw)
    return { slug: fallback, name: capitalize(fallback) }
}

const gerarDescricao = (nome) => {
    const textoLimpo = nome.replace(/-/g, ' ')
    return `Tudo em ${textoLimpo}`
}

const fetchCategorias = async () => {
    try {
        const resp = await axios.get('https://dummyjson.com/products/categories')
        const data = resp.data
        categoriasRaw.value = Array.isArray(data) ? data : []
        categoriasExibicao.value = categoriasRaw.value.map((raw) => {
            const { slug, name } = normalizeCategory(raw)
            return { slug, name, imageUrl: '' }
        })
        await Promise.all(
            categoriasExibicao.value.map(async (catObj) => {
                try {
                    const res = await axios.get(
                        `https://dummyjson.com/products/category/${encodeURIComponent(catObj.slug)}?limit=1`
                    )
                    if (res.data && Array.isArray(res.data.products) && res.data.products.length) {
                        catObj.imageUrl = res.data.products[0].thumbnail
                    }
                } catch {
                    catObj.imageUrl = ''
                }
            })
        )
    } catch {
        categoriasExibicao.value = []
    } finally {
        loading.value = false
    }
}

onMounted(fetchCategorias)
</script>

<style scoped>
/* Sem ajustes adicionais */
</style>
