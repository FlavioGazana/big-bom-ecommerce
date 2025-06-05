<template>
  <header class="sticky top-0 z-50 transition-all duration-300">
    <section :class="['w-full', isScrolled ? 'bg-gray-100/95 backdrop-blur shadow-md py-2' : 'bg-gray-100 py-4']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <!-- Logo e menu mobile -->
          <div class="flex justify-between itens-center w-full md:w-auto">
            <Icon icon="mdi:candy-outline" class="w-10 h-10" />
            <a href="/" class="text-2xl font-bold text-red-700">BIG-BOM</a>
            <button class="md:hidden text-gray-700 hover:text-indigo-600" aria-label="Toggle mobile menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Icon icon="mdi:menu" class="w-6 h-6" />
            </button>
          </div>

          <!-- Barra de pesquisa (bind em searchTerm) -->
          <div class="w-full md:flex-1 max-w-sm">
            <label class="relative w-full">
              <input
                v-model="searchTerm"
                @input="onSearchInput"
                type="text"
                placeholder="Pesquisar produtos..."
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                aria-label="Botão de busca"
                @click="onSearchSubmit"
              >
                <Icon icon="mdi:magnify" class="w-4 h-4" />
              </button>
            </label>
          </div>

          <!-- Ícones interativos do header -->
          <aside class="flex items-center justify-end space-x-4 w-full md:w-auto">
            <button class="relative p-2 text-gray-700 hover:text-red-600" aria-label="Wishlist">
              <Icon icon="mdi:heart-outline" class="w-5 h-5" />
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5
                flex items-center justify-center">20</span>
            </button>
            <button class="relative p-2 text-gray-700 hover:text-red-600" aria-label="Cart">
              <Icon icon="mdi:cart-outline" class="w-5 h-5" />
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5
                flex items-center justify-center">20</span>
            </button>
            <button class="relative p-2 text-gray-700 hover:text-red-600" aria-label="Profile">
              <Icon icon="mdi:account-outline" class="w-5 h-5" />
            </button>
          </aside>
        </div>
      </div>
    </section>

    <!-- Navbar -->
    <nav class="bg-red-800" aria-label="Main navigation">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul class="hidden md:flex justify-center py-3 flex-wrap gap-x-6 text-sm font-medium text-white">
          <li v-for="item in navItens" :key="item.id">
            <a :href="item.link" class="hover:text-red-300 trasition-colors">{{ item.name }}</a>
          </li>
        </ul>
        <section v-if="isMobileMenuOpen"
          class="md:hidden mt-2 bg-white rounded-lg shadow-md p-4 space-y-3 text-blue-300 text-center"
          aria-label="Mobile Navigation">
          <a v-for="item in navItens" :href="item.link" :key="item.id"
            class="block hover:text-amber-600 text-sm font-medium">{{ item.name }}</a>
        </section>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const navItens = [
  { id: 1, name: 'Inicio', link: '/' },
  { id: 2, name: 'Produtos', link: '/produtos' },
  { id: 3, name: 'Categorias', link: '/categorias' }
]

const router = useRouter()
const route = useRoute()


const searchTerm = ref(route.query.search || '')


const onSearchInput = () => {
  const query = { ...route.query }

  if (searchTerm.value.trim()) {
    query.search = searchTerm.value.trim()
  } else {
    delete query.search
  }
  router.replace({ path: '/produtos', query })
}


const onSearchSubmit = () => {
  onSearchInput()
}
</script>
