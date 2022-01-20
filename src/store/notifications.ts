import {defineStore} from "pinia";
import type {NotificationState} from '~/store/types'

export const useNotificationStore = defineStore('notifications', {
  state: (): NotificationState => ({
    success: false,
    message: '',
  } as NotificationState),
  actions: {
    async success(message: string) {
      this.$state.success = true
      this.message = message
      setTimeout(() => {
        this.message = ''
        this.$state.success = false
        this.error = false
      }, 5000)
    },
  }
})