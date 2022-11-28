<template>
  <q-page padding>
    <q-tabs no-caps indicator-color="primary" align="left" class="q-pb-sm">
      <q-route-tab exact to="/users" label="Список"></q-route-tab>
      <q-route-tab exact to="/users/add" label="Добавить"></q-route-tab>
    </q-tabs>
    <router-view> </router-view>
  </q-page>
</template>
