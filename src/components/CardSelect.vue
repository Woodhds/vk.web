<script lang="ts" setup>
import type { Category } from "~/api/types";

const emit = defineEmits(["save"]);
const props = defineProps<{
  isAccept: boolean;
  category: string;
  ownerId: number;
  messageId: number;
  categories: Array<Category & { score: number }>;
}>();

const save = (val: string) => {
  emit("save", props.ownerId, props.messageId, val);
};
</script>

<template>
  <select
    :value="props.isAccept ? props.category : ''"
    class="w-32 border text-sm focus:outline-none focus:ring"
    @change="(e) => save(e.target.value)"
  >
    <option disabled value="">
      {{ props.isAccept ? "" : props.category }}&nbsp;&nbsp;&bull;
    </option>
    <option v-for="c in categories" :key="c.id" :value="c.title" class="py-2">
      {{ c.title }}
      {{ props.isAccept || !c.score ? "" : ` ${Math.round(c.score * 100)}%` }}
    </option>
  </select>
</template>