<template>
  <q-page-container>
    <q-page>
      <q-form class="column" @submit.prevent="onSubmit">

        <q-input v-model="search" autocomplete="off" label="Поиск"></q-input>
        <q-btn type="submit">
          Отправить
        </q-btn>
      </q-form>
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 relative min-h-64"
      >
        <div
          v-for="m in messages"
          :key="`${m.ownerId}_${m.id}`"
          class="overflow-auto border p-4 rounded"
        >

        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import categoriesService from 'src/api/categories';
import {useMessagesStore} from 'src/stores/messages';
import type {Category, VkMessage} from 'src/api/types';
import messageService from 'src/api/messages';

type CategoryAndScore = Category & { score: number };

const store = useMessagesStore();

const messages = computed(() => store.messages);
const search = ref('');
const categories = ref([] as Category[]);

onMounted(async () => {
  categories.value = await categoriesService.getCategories();
});

const onSubmit = async () => {
  await store.getMessages(search.value);
};

const like = async (ownerId: number, id: number) => {
  await messageService.like(ownerId, id);
};

const getCategories = (message: VkMessage): CategoryAndScore[] => {
  const cat = categories.value.map((x) => ({...x})) as CategoryAndScore[];
  cat.forEach((x) => {
    x.score =
      message.scores && x.title in message.scores ? message.scores[x.title] : 0;
  });

  cat.sort((x, y) => y.score - x.score);

  return cat;
};

const save = async (ownerId: number, id: number, e: string) => {
  await messageService.save(ownerId, id, e);
};

const repost = async (ownerId: number, id: number) => {
  await store.repost([
    {
      ownerId,
      id,
    },
  ]);
};
</script>
