
<template>
  <form class="flex flex-col" @submit="onSubmit">
    <label for="search" class="mb-2 text-xl">Поиск</label>
    <input
      id="search"
      v-model="search"
      class="border border-blue-500 focus:outline-none focus:ring transition-all p-1 w-1/3 mb-2"
      autocomplete="off"
    />
    <button type="submit" class="p-2 w-1/2 sm:w-1/ md:w-1/6 btn">
      {{ t('send') }}
    </button>
  </form>
  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 relative min-h-64" :class="{'overflow-hidden': isLoading}">
    <div v-for="m in messages" :key="`${m.ownerId}_${m.id}`" class="overflow-auto border p-4 rounded">
      <a
        target="_blank"
        :title="m.owner"
        class="block flex-1 text-xl pb-4 truncate"
        :href="'https://vk.com/wall' + m.ownerId + '_' + m.id"
      >
        {{ m.owner ? m.owner : 'Пост' }}
      </a>
      <card-image :src="m.images" />
      <pre class="leading-4 whitespace-pre-wrap h-48 overflow-auto text-xs" v-html="m.text"></pre>
      <hr class="my-4" />
      <div class="flex items-center">
        <button class="flex items-center hover:text-blue-500 transition duration-200" @click="like(m.ownerId, m.id)">
          <carbon-thumbs-up class="mr-2" />
          {{ m.likesCount }}
        </button>
        <button
          class="flex items-center ml-12 hover:text-blue-500 transition duration-200"
          :class="{ 'text-red-500': m.userReposted }"
          @click="repost(m.ownerId, m.id)"
        >
          <carbon-share class="mr-2" />
          {{ m.likesCount }}
        </button>
      </div>
    </div>
    <Loading v-if="isLoading" class="text-blue-500" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '~/store'
import { ActionTypes } from '~/store/messages/actions'

const { t } = useI18n()
const store = useStore()

const messages = computed(() => store.state.messages.messages)
const isLoading = computed(() => store.state.messages.isLoading)
const search = ref('')

const onSubmit = async(e: Event) => {
  e.preventDefault()
  store.dispatch(`messages/${ActionTypes.getMessages}`, search.value)
}

const like = (ownerId: number, id: number) => {
}

const repost = (ownerId: number, id: number) => {
}

</script>
