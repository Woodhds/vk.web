<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { userUserStore } from '~/store/user'

const store = userUserStore()

const users = computed(() => [...(store.users || [])])

const deleteUser = async (id: number) => {
  await store.delete(id)
}

onMounted(async() => {
  await store.getUsers()
})
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="u in users"
      :key="u.id"
      class="inline-flex items-center px-4 py-2"
    >
      <img
        class="h-12 w-12 mr-4 rounded-full"
        :src="u.avatar"
        :title="u.name"
      />
      <div>
        <a class="block" :href="`https://vk.com/id${u.id}`" target="_blank">{{ u.name }}</a>
      </div>
      <div>
        <a href="#" class="block text-red-400 ml-4" @click.prevent="deleteUser(u.id)">
          <carbon-close/>
        </a>
      </div>
    </div>
    <router-link to="/users/add">
      <button
        class="
          bg-blue-500
          text-white
          rounded
          w-1/5
          text-center
          py-1
          hover:bg-blue-700
          cursor-pointer
        "
      >
        Добавить
      </button>
    </router-link>
  </div>
</template>
