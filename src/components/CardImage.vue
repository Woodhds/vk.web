<template>
  <q-carousel
    v-model="slide"
    v-intersection.once="onShow"
    flat
    swipeable
    arrows
    animated
    navigation
    infinite
    height="200px"
  >
    <q-carousel-slide
      v-for="item in images"
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

const images = ref<string[]>([]);

const slide = ref('');

const onShow = (e: IntersectionObserverEntry) => {
  if (e.isIntersecting) {
    images.value = props.src;
    slide.value = props.src?.length > 0 ? props.src[0] : '';
  }
};
</script>
