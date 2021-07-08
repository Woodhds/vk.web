<template>
  <div class="flex flex-col h-full">
    <header class="fixed min-h-12 bg-blue-500 w-full z-10 flex items-center">
      <div class="container mx-auto inline-flex items-center">
        <router-link to="/">
          <carbon-delivery-parcel color="white" class="text-2xl cursor-pointer transition-all hover:text-gray-200"/>
        </router-link>
        <router-link to="/users" class="text-white pl-4 hover:text-gray-200 cursor-pointer transition-all">
          {{ t('users') }}
        </router-link>
        <div class="flex-1"></div>
        <a class="text-white hover:text-gray-200 transition-all" target="_blank" :href="href">
          Войти
        </a>
      </div>
    </header>
    <main class="container mx-auto mt-12 h-full p-2">
      <router-view/>
    </main>
    <a class="absolute w-10 h-10 rounded-full transition-all right-4 bottom-4" :class="{ 'opacity-0': visible }">
      <carbon-chevron-up class="text-white"/>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const href = ref(`https://oauth.vk.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&display=page&scope=11111111&response_type=token`)
const visible = computed(() => document.body.scrollTop  <= 200)
</script>
