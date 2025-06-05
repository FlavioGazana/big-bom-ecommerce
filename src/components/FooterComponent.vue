<template>
  <footer class="bg-gray-100 text-red-800 py-2">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!--aqui vai ficar o slogam do big-->
        <div>
          <h2 class="text-2xl font-bold text-black mb-2">Big-bom</h2>
          <p class="text-sm">
            Seu mercadinho digital com as melhores ofertas, onde você estiver.
          </p>
          <div class="flex space-x-4 mt-3">
            <a href="#" aria-label="Facebook">
              <Icon icon="fa6-brands:facebook-f" class="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter">
              <Icon icon="fa6-brands:twitter" class="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram">
              <Icon icon="fa6-brands:instagram" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-3">Links Rápidos</h3>
          <ul class="space-y-1 text-sm">
            <li><a href="#">Início</a></li>
            <li><a href="#">Comprar</a></li>
            <li><a href="#">Promoções</a></li>
            <li><a href="#">Best Sellers</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-3">Atendimento</h3>
          <ul class="space-y-1 text-sm">
            <li><a href="#">Contato</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Política de Envio</a></li>
            <li><a href="#">Devoluções</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-3">Aceitamos</h3>
          <div class="flex space-x-5">
            <Icon icon="logos:visa" class="w-10 h-6" />
            <Icon icon="logos:mastercard" class="w-10 h-6" />
            <Icon icon="logos:paypal" class="w-10 h-6" />
          </div>
        </div>
      </div>

      <!--linha pra separar os componentes-->
      <div class="border-t border-black-700 mt-6 pt-4 text-center text-xs text-black">
        &copy; {{ new Date().getFullYear() }} Big-bom. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>