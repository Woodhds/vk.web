import {defineStore} from 'pinia';
import {NotificationState} from 'stores/types';
import {Notify} from 'quasar'

export const useNotificationStore = defineStore('notifications', {
  state: (): NotificationState =>
    ({
      success: false,
      danger: false,
      message: '',
    } as NotificationState),
  actions: {
    async success(message: string) {
      Notify.create({message: message, color: 'success', position: 'bottom-right'})
    },

    async danger(message: string) {
      Notify.create({ message: message, color: 'error', position: 'bottom-right' })
    },
  },
});
