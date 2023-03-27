<template>
  <q-page padding></q-page>
</template>

<script lang="ts" setup>
import {useGroupsStore} from 'stores/groups';
import {onMounted} from 'vue';

const store = useGroupsStore();



onMounted(async () => {
  await store.getGroups(1, 50)
})
</script>
