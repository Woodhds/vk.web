<template>
  <q-page padding>
    <q-input v-model="search" dense label="Поиск" />
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const search = ref('');
</script>
