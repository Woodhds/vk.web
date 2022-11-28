<template>
  <q-form
    class="q-gutter-md q-pb-md"
    style="max-width: 450px"
    @submit.prevent="makeSearch"
  >
    <q-input dense outlined v-model="search" label="Поиск" />
    <q-btn color="primary" type="submit" label="Отправить"> </q-btn>
  </q-form>
  <div class="column">
    <div
      v-for="user in users"
      :key="user.id"
      class="row q-gutter-sm items-center"
    >
      <q-avatar>
        <q-img :src="user.avatar" />
      </q-avatar>
      <q-btn
        :href="`https://vk.com/id${user.id}`"
        flat
        dense
        no-caps
        target="_blank"
        :label="user.name"
      ></q-btn>
      <q-btn color="positive" fab-mini flat icon="add" @click="add(user)">
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UsersService from 'src/api/users';
import { userUserStore } from 'src/stores/user';
import type { VkUser } from 'src/api/types';

const search = ref('');
const users = ref<VkUser[]>([]);
const store = userUserStore();

const makeSearch = async () => {
  users.value = await UsersService.search(search.value);
};

const add = async (user: VkUser) => {
  await store.add(user);
};
</script>
