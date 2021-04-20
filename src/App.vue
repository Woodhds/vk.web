<script setup lang="ts">
import { useHead } from '@vueuse/head'

window.vkAsyncInit = function() {
  // eslint-disable-next-line no-undef
  VK.init({
    apiId: 5662498,
  })
}
setTimeout(() => {
  const el = document.createElement('script')
  el.src = 'https://vk.com/js/api/openapi.js?169'
  el.type = 'text/javascript'
  el.async = true
  document.head.appendChild(el)
}, 0)

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
  ],
})
</script>

<template>
  <router-view />
</template>
