<template>
  <section class="py-12 scroll-mt-20 bg-amber-50" id="produtos">
    <main class="container mx-auto px-4">
      <header class="flex justify-between items-center mb-8">
        <h2 class="md:text-3xl text-2xl font-bold text-amber-950">Produtos Populares</h2>
        <nav class="flex space-x-4" aria-label="controle de carrossel de produtos">
          <button 
            @click="prevSlide" 
            class="p-2 rounded-full bg-white shadow-md hover:bg-red-100 text-red-700 transition-colors"
            aria-label="slide anterior">
            <Icon icon="line-md:arrow-small-left" width="24" height="24" />
          </button>
          <button 
            @click="nextSlide" 
            class="p-2 rounded-full bg-white shadow-md hover:bg-red-100 text-red-700 transition-colors"
            aria-label="próximo slide">
            <Icon icon="line-md:arrow-small-right" width="24" height="24" />
          </button>
        </nav>
      </header>

      <section class="relative overflow-hidden">
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li
            v-for="product in visibleProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <article>
              <figure class="relative">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-64 object-cover rounded"
                />
                <figcaption
                  v-if="product.discountPercentage > 0"
                  class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  -{{ Math.round(product.discountPercentage) }}%
                </figcaption>
              </figure>

              <section class="p-4">
                <div class="flex items-center mb-2">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    icon="line-md:star-alt-filled"
                    width="16"
                    height="16"
                    :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                  />
                  <span class="text-sm text-gray-500 ml-1">({{ product.rating }})</span>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ product.title }}</h3>

                <footer class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-bold text-red-700">
                      {{
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(product.price)
                      }}
                    </span>
                  </div>
                  <router-link
                    :to="`/produto/${product.id}`"
                    class="p-2 bg-red-700 rounded-full text-white hover:bg-red-600 transition-colors"
                    aria-label="Ver detalhes"
                  >
                    <Icon icon="icon-park-solid:shopping" width="18" height="18" />
                  </router-link>
                </footer>
              </section>
            </article>
          </li>
        </ul>
      </section>

      <nav class="flex justify-center mt-6 space-x-2" aria-label="Paginação do Carrossel">
        <button
          v-for="index in totalSlides"
          :key="index"
          @click="currentSlide = index - 1"
          :class="['w-3 h-3 rounded-full', currentSlide === index - 1 ? 'bg-red-950' : 'bg-gray-400']"
        ></button>
      </nav>
    </main>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'


const currentSlide = ref(0)


const productsPerPage = ref(4)


const products = ref([])


const fetchProducts = async () => {
  try {
    
    const response = await axios.get('https://dummyjson.com/products?limit=100')
    products.value = response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos da API:', error)
  }
}


const totalSlides = computed(() =>
  Math.ceil(products.value.length / productsPerPage.value)
)


const visibleProducts = computed(() => {
  const start = currentSlide.value * productsPerPage.value
  return products.value.slice(start, start + productsPerPage.value)
})


const nextSlide = () => {
  currentSlide.value =
    currentSlide.value === totalSlides.value - 1 ? 0 : currentSlide.value + 1
}


const prevSlide = () => {
  currentSlide.value =
    currentSlide.value > 0 ? currentSlide.value - 1 : 0
}


const handleResize = () => {
  if (window.innerWidth < 640) {
    productsPerPage.value = 1
  } else if (window.innerWidth < 768) {
    productsPerPage.value = 2
  } else if (window.innerWidth < 1024) {
    productsPerPage.value = 3
  } else {
    productsPerPage.value = 4
  }
}

onMounted(() => {
  handleResize()
  fetchProducts()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>

</style>
