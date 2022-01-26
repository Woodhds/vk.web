<template>
  <div class="mt-3">
    <form class="flex flex-col w-1/2" @submit.prevent="submit">
      <label>OwnerId</label>
      <input v-model="model.ownerId" class="border border-blue-500 focus:outline-none focus:ring mb-3" type="number"/>
      <label>Id</label>
      <input v-model="model.id" class="border border-blue-500 focus:outline-none focus:ring mb-3" type="number"/>
      <label for="text">Текст</label>
      <textarea
        id="text"
        v-model="model.text"
        rows="7"
        class="border border-blue-500 focus:outline-none focus:ring mb-3"
      />
      <div class="flex mb-3">
        <button class="btn" type="submit">Отправить</button>
      </div>
    </form>
    <div class="flex-row flex">
      <ul class="flex flex-row w-full justify-between">
        <li v-for="(k, v) in predictions" :key="k" class="flex flex-col">
          <div>{{ v }}</div>
          <div>{{ Math.round(k * 100) }}%</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import messageService from "~/services/messages";
import type {PredictResult} from "~/services/types";

const model = reactive({
  text: '',
  ownerId: '',
  id: ''
});
const predictions = ref<PredictResult>({})

const submit = async () => {
  predictions.value = await messageService.predict(+model.ownerId, +model.id, model.text)
}

</script>

<style scoped>

</style>