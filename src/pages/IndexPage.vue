<template>
  <q-page padding>
    <q-form
      class="q-gutter-md"
      style="max-width: 450px"
      @submit.prevent="onSubmit"
    >
      <q-input
        outlined
        v-model="search"
        autocomplete="off"
        dense
        label="Поиск"
      ></q-input>
      <q-btn color="primary" type="submit">Отправить</q-btn>
    </q-form>
    <div v-for="m in messages" :key="`${m.ownerId}_${m.id}`">
      <card-panel :message="m">
        <template #bottom="{ message }">
          <q-card-actions>
            <q-btn
              flat
              icon="thumb_up"
              @click="like(message.ownerId, message.id)"
            >
              {{ message.likesCount }}
            </q-btn>
            <q-btn
              :color="message.userReposted ? 'danger' : 'primary'"
              icon="send"
              @click="repost(message.ownerId, message.id)"
            >
              {{ message.repostsCount }}
            </q-btn>
          </q-card-actions>
        </template>
      </card-panel>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CardPanel from 'components/CardPanel.vue';
import { computed, onMounted, ref } from 'vue';
import categoriesService from 'src/api/categories';
import { useMessagesStore } from 'src/stores/messages';
import type { Category, VkMessage } from 'src/api/types';
import messageService from 'src/api/messages';

/* type CategoryAndScore = Category & { score: number }; */

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

/* const getCategories = (message: VkMessage): CategoryAndScore[] => {
  const cat = categories.value.map((x) => ({ ...x })) as CategoryAndScore[];
  cat.forEach((x) => {
    x.score =
      message.scores && x.title in message.scores ? message.scores[x.title] : 0;
  });

  cat.sort((x, y) => y.score - x.score);

  return cat;
}; */

/*
const save = async (ownerId: number, id: number, e: string) => {
  await messageService.save(ownerId, id, e);
};
*/

const repost = async (ownerId: number, id: number) => {
  await store.repost([
    {
      ownerId,
      id,
    },
  ]);
};
</script>
