<template>
  <div class="flex flex-col">
    <div v-for="u in users" :key="u.id" class="inline-flex items-center px-4 py-2">
      <img class="h-12 w-12 mr-4 rounded-full" :src="u.avatar" :title="u.name" />
      <a :href="`https://vk.com/id${u.id}`" target="_blank">{{ u.name }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '~/store'
import { ActionTypes } from '~/store/user/actions'

const store = useStore()
const users = computed(() => store.state.user.users ?? [])

store.dispatch(`user/${ActionTypes.getUsers}`)
</script>
