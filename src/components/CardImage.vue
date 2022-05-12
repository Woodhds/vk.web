<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: Array as () => Array<string>,
    default: () => [],
  },
})

const currentImage = ref(0)
const img = ref<HTMLImageElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)
const visible = ref(false)

const totalImage = computed(() => {
  return props.src.length
})

const imagePoints = computed(() => {
  return Array.from(Array(totalImage.value).keys())
})

const setCurrent = (image: number) => {
  currentImage.value = image
}

const next = () => {
  if (currentImage.value < totalImage.value - 1)
    currentImage.value = currentImage.value + 1
}

const prev = () => {
  if (currentImage.value > 0)
    currentImage.value = currentImage.value - 1
}

const srcImg = computed(() => {
  return visible.value
    ? props.src.length > 0
      ? props.src[currentImage.value]
      : 'src/assets/images/nophoto.png'
    : null
})

onMounted(() => {
  if (!img.value)
    return

  observer.value = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((x) => {
      if (x.isIntersecting && img.value) {
        visible.value = true
        imgObserver.unobserve(x.target)
      }
    })
  })
  observer.value.observe(img.value)
})

onUnmounted(() => {
  if (!observer.value)
    return

  observer.value.disconnect()
})

</script>
<template>
  <div class="flex flex-col items-center relative">
    <div class="">
      <button v-if="totalImage > 1" class="action-btn action-btn__left btn" @click="prev">
        <carbon-arrow-left />
      </button>
    </div>
    <div class="flex flex-col mb-2 items-center">
      <img ref="img" class="h-32 w-48 mb-2" :src="srcImg" />
      <ul class="flex flex-wrap items-center justify-center h-4">
        <li
          v-for="(image, i) in imagePoints"
          :key="i"
          class="rounded-full relative border border-gray-300 h-4 w-4 p-1 ml-2 cursor-pointer"
          @click="setCurrent(image)"
        >
          <span
            v-if="image === 0"
            :style="{ transform: 'translateX(' + currentImage * 24 + 'px)' }"
            style="margin: 1px"
            class="bg-gray-500 top-0 image-point left-0 w-3 h-3 absolute rounded-full block"
          ></span>
        </li>
      </ul>
    </div>
    <div>
      <button v-if="totalImage > 1" class="action-btn action-btn__right btn" @click="next">
        <carbon-arrow-right />
      </button>
    </div>
  </div>
</template>

<style scoped>
.action-btn {
  @apply absolute rounded-full flex flex-col p-2 opacity-40 hover:opacity-100;
  top: 40%
}

.action-btn__left {
  @apply left-0;
}

.action-btn__right {
  @apply right-0;
}

.image-point {
  transition: transform .15s linear;
}

</style>
