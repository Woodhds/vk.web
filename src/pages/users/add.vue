<script lang="ts" setup>
import {ref} from 'vue'
import UsersService from '../../api/users'
import {userUserStore} from "~/store/user";
import type {VkUser} from '~/api/types'

const search = ref('')
const users = ref<VkUser[]>([])
const store = userUserStore()

const makeSearch = async () => {
  users.value = await UsersService.search(search.value)
}

const add = async (user: VkUser) => {
  await store.add(user)
}
</script>

<template>
  <form class="flex flex-col w-2/5 md:w-1/5 gap-3 mb-3" @submit.prevent="makeSearch">
    <label class="flex flex-col">
      Поиск
      <input
        v-model="search"
        autocomplete="off"
        autofocus
        required
        class="border border-blue-500 focus:outline-none focus:ring"
      />
    </label>
    <button type="submit" class="btn w-1/2">
      Отправить
    </button>
  </form>
  <div class="flex flex-col gap-3">
    <div v-for="user in users" :key="user.id" class="flex flex-row gap-x-3 items-center gep-y-3">
      <div
        class="h-12 w-12 rounded-full bg-center bg-no-repeat bg-cover"
        :style="{ background: `url(${user.avatar})` }"
      ></div>
      <a :href="`https://vk.com/id${user.id}`" target="_blank" class="w-1/5">{{ user.name }}</a>
      <button class="btn" @click="add(user)">
        <carbon-add/>
      </button>
    </div>
  </div>
</template>
