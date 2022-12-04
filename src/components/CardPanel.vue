<template>
  <q-card>
    <q-card-section class="q-pb-none">
      <q-btn
        :href="'https://vk.com/wall' + message.ownerId + '_' + message.id"
        :title="message.owner"
        target="_blank"
        flat
        dense
        padding="0"
        class="card__title"
      >
        {{ message.owner ? message.owner : 'Пост' }}
      </q-btn>
      <q-item-label caption>
        {{ date.formatDate(message.date, 'DD.MM.YYYY HH:mm:ss') }}
      </q-item-label>
    </q-card-section>
    <q-card-section>
      <card-image :src="message.images"/>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 12rem; width: 100%">
        <pre class="card__text" v-html="text"></pre>
      </q-scroll-area>
    </q-card-section>
    <q-separator/>
    <slot :message="message" name="bottom"></slot>
  </q-card>
</template>

<script lang="ts" setup>
import type {VkMessage} from 'src/api/types';
import {computed} from 'vue';
import CardImage from 'src/components/CardImage.vue';
import {date} from 'quasar'

const regexp = /\[(club[0-9]+)\|(.+)\]/;

const props = defineProps({
  message: {
    type: Object as () => VkMessage,
    default: () => null,
    required: true,
  },
});

const text = computed(() => {
  return props.message.text.replace(
    regexp,
    '<a href=\'https://vk.com/$1\' target=\'_blank\' style=\'color: #2a5885;font-weight: 500\'>$2</a>'
  );
});
</script>

<style scoped>
.card__text {
  font-size: 0.8em;
  white-space: pre-wrap;
}

.card__title :deep(.q-btn__content) {
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

:deep(.q-scrollarea__content) {
  width: 100%;
}
</style>
