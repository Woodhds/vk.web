<template>
  <div class="flex items-center pb-4">
    <a
      target="_blank"
      :title="message.owner"
      class="block flex-1 text-xl truncate"
      :href="'https://vk.com/wall' + message.ownerId + '_' + message.id"
    >
      {{ message.owner ? message.owner : "Пост" }}
    </a>
  </div>

  <card-image :src="message.images" />
  <pre
    class="leading-4 whitespace-pre-wrap h-48 overflow-auto text-xs"
    v-html="message.text"
  ></pre>
  <slot name="bottom" :message="message"></slot>
</template>

<script lang="ts" setup>
import type {VkMessage} from "~/api/types";

defineProps({
  message: {
    type: Object as () => VkMessage,
    default: () => null,
    required: true
  }
})
</script>