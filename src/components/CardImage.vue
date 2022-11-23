<template>
  <q-carousel-control navigation padding arrows height="300px">
    <q-carousel-slide
      v-for="item in src"
      :key="item"
      :img-src="item"
      :name="item"
    ></q-carousel-slide>
  </q-carousel-control>
</template>

<script lang="ts" setup>

defineProps({
  src: {
    type: Array as () => Array<string>,
    default: () => [],
  },
});
</script>
