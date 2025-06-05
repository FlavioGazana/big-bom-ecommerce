<template>
  <section id="home" class="bg-amber-50 scroll-mt-20 min-h-screen py-12 flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
      <!-- Conteúdo à esquerda -->
      <div class="text-center lg:text-left max-w-xl">
        <h1 class="text-4xl sm:text-5xl font-bold text-amber-950 leading-tight mb-4">
          O gerente ficou maluco!
        </h1>
        <p class="text-gray-700 text-base sm:text-lg mb-6">
          É o grande feirão de ofertas do mercadinho BIG-BOM com uma grande variedade de produtos e descontos imperdíveis
        </p>
        <div class="flex justify-center lg:justify-start gap-4">
          <a href="/products"
            class="px-6 py-3 bg-red-900 text-white text-sm font-semibold rounded-lg shadow
            hover:bg-red-600 transition">Comprar agora</a>
          <a href="/offers"
            class="px-6 py-3 border border-red-500 text-red-600 text-sm font-semibold rounded-lg
            hover:bg-red-200 transition">Ofertas do feirão</a>
        </div>
      </div>

      <!-- Imagem à direita -->
      <div class="w-full lg:w-1/2 flex justify-center">
        <img src="../assets/panelas.png" alt="Produto Em Destaque" class="w-3/4 lg:w-full max-w-md mx-auto rounded-xl shadow-lg" />
      </div>
    </div>
  </section>
</template>
