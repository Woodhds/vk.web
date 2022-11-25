<template>
  <q-carousel
    v-model="slide"
    flat
    swipeable
    arrows
    animated
    navigation
    infinite
    height="200px"
  >
    <q-carousel-slide
      v-for="item in src"
      :key="item"
      :img-src="item"
      :name="item"
    ></q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: Array as () => Array<string>,
    default: () => [],
  },
});

const slide = ref(props.src?.length > 0 ? props.src[0] : '');
</script>
