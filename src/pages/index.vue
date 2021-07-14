<template>
  <form class="flex flex-col" @submit.prevent="onSubmit">
    <label for="search" class="mb-2 text-xl">Поиск</label>
    <input
      id="search"
      v-model="search"
      class="
        border border-blue-500
        focus:outline-none focus:ring
        transition-all
        p-1
        sm:w-1/2
        md:w-1/3
        mb-2
      "
      autocomplete="off"
    />
    <button type="submit" class="p-2 w-1/2 md:w-1/6 btn">
      {{ t("send") }}
    </button>
  </form>
  <button
    class="btn mt-2"
    :style="{ visibility: selected ? 'visible' : 'hidden' }"
    @click="repostAll"
  >
    Репост всех
  </button>
  <div
    class="
      grid
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-4
      py-6
      relative
      min-h-64
    "
  >
    <div
      v-for="m in messages"
      :key="`${m.ownerId}_${m.id}`"
      class="overflow-auto border p-4 rounded"
    >
      <div class="flex items-center pb-4">
        <a
          target="_blank"
          :title="m.owner"
          class="block flex-1 text-xl truncate"
          :href="'https://vk.com/wall' + m.ownerId + '_' + m.id"
        >
          {{ m.owner ? m.owner : "Пост" }}
        </a>
        <toggle v-if="!m.userReposted" v-model:value="m.isSelected" />
      </div>

      <card-image :src="m.images" />
      <pre
        class="leading-4 whitespace-pre-wrap h-48 overflow-auto text-xs"
        v-html="m.text"
      ></pre>
      <hr class="my-4" />
      <div class="flex items-center">
        <button
          class="
            flex
            items-center
            hover:text-blue-500
            transition
            duration-200
            focus:outline-none
          "
        >
          <carbon-thumbs-up class="mr-2" />
          {{ m.likesCount }}
        </button>
        <button
          class="
            flex
            items-center
            ml-12
            hover:text-blue-500
            transition
            duration-200
            focus:outline-none
          "
          :class="{ 'text-red-500': m.userReposted }"
          @click="repost(m.ownerId, m.id)"
        >
          <carbon-share class="mr-2" />
          {{ m.likesCount }}
        </button>
        <div class="flex-1"></div>
        <div>
          <div v-if="!m.isAccept" class="text-sm">
            {{ m.category }}
          </div>
          <select
            class="w-32 border text-sm focus:outline-none focus:ring"
            :value="m.isAccept ? m.category : ''"
            @change="(e) => save(m.ownerId, m.id, e.target.value)"
          >
            <option value="">Нет</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.title"
              class="py-2"
              :style="{ 'background-color': `${category.color}76` }"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import categoriesService from "~/services/categories";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/messages/actions";
import type { Category } from "~/services/types";
import messageService from "~/services/messages";

const { t } = useI18n();
const store = useStore();

const messages = computed(() => store.state.messages.messages);
const search = ref("");
const categories = ref([] as Category[]);

onMounted(async () => {
  categories.value = await categoriesService.getCategories();
});

const onSubmit = async () => {
  store.dispatch(`messages/${ActionTypes.getMessages}`, search.value);
};

const selected = computed(() =>
  messages.value ? messages.value.some((f) => f.isSelected) : false
);

const like = async (ownerId: number, id: number) => {};

const save = async (ownerId: number, id: number, e: string) => {
  await messageService.save(ownerId, id, e);
};

const repost = (ownerId: number, id: number) => {
  store.dispatch(`messages/${ActionTypes.repost}`, [
    {
      ownerId,
      id,
    },
  ]);
};

const repostAll = () => {
  store.dispatch(
    `messages/${ActionTypes.repost}`,
    messages.value
      .filter((a) => a.isSelected)
      .map((q) => ({
        ownerId: q.ownerId,
        id: q.id,
      }))
  );
};
</script>
