<template>
  <q-card class="my-card bg-secondary text-white">
    <q-card-section>
      <a
        :href="'https://vk.com/wall' + message.ownerId + '_' + message.id"
        :title="message.owner"
        class="block flex-1 text-xl truncate"
        target="_blank"
      >
        {{ message.owner ? message.owner : 'Пост' }}
      </a>
    </q-card-section>
    <q-card-section>
      <card-image :src="message.images" />
    </q-card-section>
    <q-card-section>
        <pre
          class="leading-4 whitespace-pre-wrap h-48 overflow-auto text-xs"
          v-html="text"
        ></pre>
    </q-card-section>
    <q-separator dark inset />
    <slot :message="message" name="bottom"></slot>
  </q-card>
</template>

<script lang="ts" setup>
import type { VkMessage } from 'src/api/types';
import { computed } from 'vue';
import CardImage from 'src/components/CardImage'

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
    "<a href='https://vk.com/$1' target='_blank' style='color: #2a5885;font-weight: 500'>$2</a>"
  );
});
</script>
