<template>
  <q-page padding>
    <q-form
      class="q-gutter-md q-pb-md"
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
      <q-btn color="primary" type="submit" :loading="isSearch">Отправить</q-btn>
    </q-form>
    <div class="row q-col-gutter-md">
      <div
        v-for="(m, idx) in messages"
        :key="`${m.ownerId}_${m.id}`"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <card-panel :message="m" :is-loading="isCardLoading(m.ownerId, m.id)">
          <template #bottom="{ message }">
            <q-card-actions>
              <q-btn
                flat
                dense
                icon="thumb_up"
                color="primary"
                :label="message.likesCount"
                @click="like(message.ownerId, message.id)"
              >
              </q-btn>
              <q-btn
                flat
                dense
                icon="send"
                :loading="isLoading[idx]"
                :color="message.userReposted ? 'negative' : 'primary'"
                :label="message.repostsCount"
                @click="repost(message.ownerId, message.id, idx)"
              >
              </q-btn>
              <q-space />
              <q-btn color="grey-4" flat dense icon="refresh" @click="update(message.ownerId, message.id)" />
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
import messageService from 'src/api/messages';

const store = useMessagesStore();

const messages = computed(() => store.messages);
const search = ref('');
const isLoading = ref<Array<boolean>>([]);
const cardLoading = ref('');
const isSearch = ref<boolean>(false);

const isCardLoading =  (ownerId: number, id: number) => {
  return cardLoading.value === `${ownerId}_${id}`
}

watch(messages, () => {
  isLoading.value = messages.value.map(() => false);
});

const update = async (ownerId: number, id: number) => {
  try {
    cardLoading.value = `${ownerId}_${id}`;
    await store.update(ownerId, id)
  } finally {
    cardLoading.value = ''
  }
}

const onSubmit = async () => {
  try {
    isSearch.value = true;
    await store.getMessages(search.value);
  } finally {
    isSearch.value = false;
  }
};

const like = async (ownerId: number, id: number) => {
  await messageService.like(ownerId, id);
};

const repost = async (ownerId: number, id: number, idx: number) => {
  try {
    isLoading.value[idx] = true;
    await store.repost([
      {
        ownerId,
        id,
      },
    ]);
  } finally {
    isLoading.value[idx] = false;
  }
};
</script>
