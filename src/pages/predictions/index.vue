<template>
  <div class="mt-3">
    <form class="flex flex-col md:w-1/2 w-full" @submit.prevent="submit">
      <label for="message-id">Id</label>
      <input
        id="message-id"
        v-model="textId"
        class="border border-blue-500 focus:outline-none focus:ring"
        :class="{
          'mb-3': !warning,
        }"
        autocomplete="off"
      />
      <span v-if="warning" class="text-red-500 mb-3">{{ warning }}</span>
      <pre
        class="
          leading-4
          whitespace-pre-wrap
          h-48
          overflow-auto
          text-xs
          min-h-64
          border border-blue-500
          mb-3
        "
        v-html="text"
      />
      <div class="flex mb-3">
        <button class="btn" type="submit">Отправить</button>
      </div>
    </form>
    <div class="flex-row flex">
      <ul class="flex flex-row w-full justify-between flex-wrap">
        <li
          v-for="(k, v) in predictions"
          :key="k"
          class="flex flex-col w-1/5 p-1"
        >
          <div>{{ v }}</div>
          <div>{{ Math.round(k * 100) }}%</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import messageService from "~/api/messages";
import type { PredictResult } from "~/api/types";
import { sort } from "~/utils/predict";

const regexp = /\d+_\d+/;

const textId = ref("");
const text = ref("");
const warning = ref("");
const predictions = ref<PredictResult>({});

const validate = () => {
  if (!regexp.test(textId.value)) {
    warning.value = "Неверный идентификатор";
  } else {
    warning.value = "";
  }
};

const submit = async () => {
  validate();
  if (warning.value) return;

  const [ownerId, id] = textId.value.split("_");

  const { predict, message } = await messageService.predict(+ownerId, +id);
  text.value = message?.text;
  predictions.value = sort(predict);
};
</script>
