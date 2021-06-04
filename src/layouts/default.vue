<template>
  <div class="flex flex-col h-full">
    <header class="fixed min-h-12 bg-blue-500 w-full z-10 flex items-center">
      <div class="container mx-auto inline-flex items-center">
        <router-link to="/">
          <carbon-delivery-parcel color="white" class="text-2xl cursor-pointer transition-all hover:text-gray-200" />
        </router-link>
        <router-link to="/users" class="text-white pl-4 hover:text-gray-200 cursor-pointer transition-all">
          {{ t('users') }}
        </router-link>
        <div class="flex-1"></div>
        <a target="_blank" :href="href">
          Войти
        </a>
      </div>
    </header>
    <main class="container mx-auto mt-12 h-full p-2">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const href = ref(`https://oauth.vk.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&display=page&scope=11111111&response_type=token`)
</script>
