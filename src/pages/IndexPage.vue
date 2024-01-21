<template>
  <q-page padding>
    <q-form class="q-gutter-md q-pb-md" style="max-width: 450px" @submit.prevent="onSubmit">
      <q-input outlined v-model="search" autocomplete="off" dense label="Поиск"></q-input>
      <q-btn color="primary" type="submit" :loading="isSearch">Отправить</q-btn>
      <q-checkbox label="Скрыть репостнутые" v-model="isReposted" dense />
    </q-form>
    <div class="row q-col-gutter-md">
      <div v-for="(m, idx) in messages" :key="`${m.ownerId}_${m.id}`" class="col-xs-12 col-sm-6 col-md-4">
        <card-panel :message="m" :is-loading="isCardLoading(m.ownerId, m.id)">
          <template #bottom="{ message }">
            <q-card-actions>
              <q-btn flat dense icon="thumb_up" :label="message.likesCount" :loading="isLoading[idx].like"
                :color="message.userLikes ? 'negative' : 'primary'" @click="like(message.ownerId, message.id, idx)">
              </q-btn>
              <q-btn flat dense icon="send" :loading="isLoading[idx].repost"
                :color="message.userReposted ? 'negative' : 'primary'" :label="message.repostsCount"
                @click="repost(message.ownerId, message.id, idx)">
              </q-btn>
            </q-card-actions>
          </template>
        </card-panel>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CardPanel from 'components/CardPanel.vue';
import { computed, ref, watch } from 'vue';
import { useMessagesStore } from 'src/stores/messages';
import { useQuasar } from 'quasar'
import { AxiosError } from 'axios';

const store = useMessagesStore();
const q = useQuasar();

const messages = computed(() => isReposted.value ? store.messages.filter(a => !a.userReposted) : store.messages);
const search = ref('');
const isLoading = ref<{ like: boolean, repost: boolean }[]>([]);
const cardLoading = ref('');
const isSearch = ref<boolean>(false);
const isReposted = ref(false);

const isCardLoading = (ownerId: number, id: number) => {
  return cardLoading.value === `${ownerId}_${id}`
}

watch(messages, () => {
  isLoading.value = messages.value.map(() => ({ like: false, repost: false }));
});

const onSubmit = async () => {
  try {
    isSearch.value = true;
    await store.getMessages(search.value);
  } finally {
    isSearch.value = false;
  }
};

const like = async (ownerId: number, id: number, idx: number) => {
  try {
    isLoading.value[idx].like = true;
    await store.like(ownerId, id);
  } finally {
    isLoading.value[idx].like = false;
  }
};

const repost = async (ownerId: number, id: number, idx: number) => {
  try {
    isLoading.value[idx].repost = true;
    await store.repost([
      {
        ownerId,
        id,
      },
    ]);
  } catch (e) {
    q.notify({ badgePosition: 'top-right', type: 'negative', message: (e as AxiosError).message })
  } finally {
    isLoading.value[idx].repost = false;
  }
};
</script>
