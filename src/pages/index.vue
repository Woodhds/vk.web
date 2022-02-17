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
      <card :message="m">
        <template #bottom="{ message }">
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
              @click="like"
            >
              <carbon-thumbs-up class="mr-2" />
              {{ message.likesCount }}
            </button>
            <button
              class="
                flex
                items-center
                ml-4
                hover:text-blue-500
                transition
                duration-200
                focus:outline-none
              "
              :class="{ 'text-red-500': message.userReposted }"
              @click="repost(message.ownerId, message.id)"
            >
              <carbon-share class="mr-2" />
              {{ message.repostsCount }}
            </button>
            <div class="flex-1"></div>
            <div>
              <select
                class="w-32 border text-sm focus:outline-none focus:ring"
                :value="message.isAccept ? message.category : ''"
                @change="
                  (e) => save(message.ownerId, message.id, e.target.value)
                "
              >
                <option value="" disabled>
                  {{
                    message.isAccept ? "" : message.category
                  }}&nbsp;&nbsp;&bull;
                </option>
                <option
                  v-for="category in getCategories(message)"
                  :key="category.id"
                  :value="category.title"
                  class="py-2"
                >
                  {{ category.title }}
                  {{
                    message.isAccept || !category.score
                      ? ""
                      : ` ${Math.round(category.score * 100)}%`
                  }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Card from "~/components/Card.vue";
import categoriesService from "~/api/categories";
import { useMessagesStore } from "~/store/messages";
import type { Category, VkMessage } from "~/api/types";
import messageService from "~/api/messages";

type CategoryAndScore = Category & { score: number };

const { t } = useI18n();
const store = useMessagesStore();

const messages = computed(() => store.messages);
const search = ref("");
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
  const cat = [...categories.value] as CategoryAndScore[];
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
