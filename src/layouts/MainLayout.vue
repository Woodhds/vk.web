<template>
  <q-layout view="hHh Lpr lfr">
    <q-header elevated>
      <q-toolbar>
        <q-icon class="q-mr-lg" name="settings" size="24px"/>
        <q-tabs>
          <q-route-tab to="/" no-caps>
            Репосты
          </q-route-tab>
          <q-route-tab to="/users" no-caps>
            Пользователи
          </q-route-tab>
        </q-tabs>
        <q-space/>
        <q-btn flat label="Получить" @click="grab" no-caps/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import messageService from 'src/api/messages';

const grab = async () => {
  await messageService.grab();
};
</script>
