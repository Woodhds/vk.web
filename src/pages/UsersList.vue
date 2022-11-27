<template>
  <q-page>
    <div
      v-for="u in users"
      :key="u.id"
      class="row items-center q-pa-xs"
    >
      <q-avatar>
        <q-img
          :src="u.avatar"
          :title="u.name"/>
      </q-avatar>
      <q-btn class="col-xs-8 col-md-3 col-lg-2" unelevated dense flat no-caps :href="`https://vk.com/id${u.id}`"
             target="_blank" :label="u.name"/>
      <q-btn color="negative" flat fab-mini icon="close" dense @click.prevent="deleteUser(u.id)"/>
    </div>

    <q-btn no-caps label="Добавить" color="primary" class="q-mt-md" to="/users/add">
    </q-btn>
  </q-page>
</template>


<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import {userUserStore} from 'src/stores/user'

const store = userUserStore()

const users = computed(() => [...(store.users || [])])

const deleteUser = async (id: number) => {
  await store.delete(id)
}

onMounted(async () => {
  await store.getUsers()
})
</script>

