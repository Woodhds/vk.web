import { defineStore } from "pinia";
import type { NotificationState } from "~/store/types";

export const useNotificationStore = defineStore("notifications", {
  state: (): NotificationState =>
    ({
      success: false,
      danger: false,
      message: "",
    } as NotificationState),
  actions: {
    async success(message: string) {
      this.$state.success = true;
      this.$state.danger = false;
      this.message = message;
      setTimeout(() => {
        this.message = "";
        this.$state.success = false;
        this.$state.danger = false;
        this.error = false;
      }, 5000);
    },

    async danger(message: string) {
      this.$state.danger = true;
      this.$state.success = false;
      this.message = message;
      setTimeout(() => {
        this.message = "";
        this.$state.danger = false;
        this.$state.success = false;
        this.error = false;
      }, 5000);
    },
  },
});
