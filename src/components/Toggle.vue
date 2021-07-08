<template>
  <div class="flex items-center" @click="onChange">
    <div
      class="relative rounded-full w-12 h-6 transition duration-200 ease-linear"
      :class="[value ? 'bg-green-400' : 'bg-gray-400']"
    >
      <label
        class="absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer"
        :class="[value ? 'translate-x-full border-green-400' : 'translate-x-0 border-gray-400']"
      ></label>
      <input
        id="toggle"
        type="checkbox"
        class="appearance-none w-full h-full active:outline-none focus:outline-none"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const { emit } = getCurrentInstance()

const props = defineProps({
  value: Boolean,
})

const onChange = () => {
  emit('update:value', !props.value)
}
</script>
