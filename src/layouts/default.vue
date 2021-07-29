<template>
  <header class="fixed min-h-12 bg-blue-500 w-full z-10 flex items-center">
    <div class="container mx-auto inline-flex items-center">
      <router-link to="/">
        <carbon-delivery-parcel
          color="white"
          class="text-2xl cursor-pointer transition-all hover:text-gray-200"
        />
      </router-link>
      <router-link
        to="/users"
        class="
          text-white
          pl-4
          hover:text-gray-200
          cursor-pointer
          transition-all
        "
      >
        {{ t('users') }}
      </router-link>
      <div class="flex-1"></div>
      <button class="btn" @click="grab">Получить</button>
    </div>
  </header>
  <main class="container mx-auto pt-12 p-2">
    <router-view/>
  </main>
  <div class="h-32 w-64 bg-green-100 fixed -bottom-64 right-4 transition-all rounded"
       :class="successMessage ? 'bottom-4' : '-bottom-64'"
  >
    <div class="text-center py-2">Сообщение</div>
    <hr class="border-green-700"/>
    <div class="text-center">{{ message }}</div>
  </div>
  <button
    class="
      fixed
      w-10
      h-10
      rounded-full
      focus:outline-none
      transition-all
      right-4
      bottom-4
      bg-blue-500
      hover:bg-blue-700
      cursor-pointer
      py-2
      text-center
      block
      z-10
    "
    :class="{ 'opacity-0': invisible }"
    @click="scrollTop"
  >
    <carbon-chevron-up class="text-white"/>
  </button>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from '~/store'
import { ActionTypes } from '~/store/notifications/actions'
import messageService from '~/services/messages'

enum NotificationMessageType {
  Success = 0,
  Danger,
  Warning
}

type NotificationMessage = {
  messageType: NotificationMessageType
  message: string
}

const store = useStore()
const { t } = useI18n()
const scroll = ref<number>(0)
const eventSource = ref<EventSource | null>(null)

const handleScroll = () => {
  scroll.value = window.scrollY
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll)

  eventSource.value = new EventSource(
    `${import.meta.env.VITE_API_BASE_URL}/notifications`,
  )

  eventSource.value.onmessage = async(e: MessageEvent) => {
    const message: NotificationMessage = JSON.parse(e.data)
    if (message.messageType === NotificationMessageType.Success) {
      await store.dispatch(`notifications/${ActionTypes.Success}`, message.message)
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleScroll)
  eventSource.value?.close()
  eventSource.value = null
})

const scrollTop = () => {
  window.scrollTo(0, 0)
}

const grab = async () => {
  await messageService.grab()
}

const invisible = computed(() => scroll.value <= 200)
const successMessage = computed(() => store.state.notifications.success)
const message = computed(() => store.state.notifications.message)
</script>
