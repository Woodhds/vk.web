<script lang="ts" setup>
import type { VkMessage } from '~/api/types'

const regexp = /\[(club[0-9]+)\|(.+)\]/

const props = defineProps({
  message: {
    type: Object as () => VkMessage,
    default: () => null,
    required: true,
  },
})

const text = computed(() => {
  return props.message.text.replace(regexp, '<a href=\'https://vk.com/$1\' target=\'_blank\' style=\'color: #2a5885;font-weight: 500\'>$2</a>')
})
</script>

<template>
  <div class="flex items-center pb-4">
    <a
      :href="'https://vk.com/wall' + message.ownerId + '_' + message.id"
      :title="message.owner"
      class="block flex-1 text-xl truncate"
      target="_blank"
    >
      {{ message.owner ? message.owner : 'Пост' }}
    </a>
  </div>

  <card-image :src="message.images"/>
  <pre
    class="leading-4 whitespace-pre-wrap h-48 overflow-auto text-xs"
    v-html="text"
  ></pre>
  <slot :message="message" name="bottom"></slot>
</template>
