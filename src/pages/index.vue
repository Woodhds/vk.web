<script setup lang="ts">
type VkAuthResponse = { status: 'connected' | 'unknown' | 'not_authorized'; session: { expire: number; mid: string; sid: string; sig: string; user: { id: string; last_name: string; first_name: string } } }

const login = () => {
  window.VK.Auth.login((a: VkAuthResponse) => {
    window.VK.Api.call('users.get', { v: '5.130', fields: ['photo_50'] }, (r: unknown) => {
      console.log(r)
    })
  }, 111111111)
}

</script>

<template>
  <button class="btn" @click.prevent="login">
    Логин
  </button>
</template>
