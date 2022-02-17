import { defineStore } from "pinia";
import type { VkUser } from "~/api/types";
import UsersService from "~/api/users";
import type { UserState } from "~/store/types";

let isInit = false;

export const userUserStore = defineStore("user", {
  state: (): UserState => ({ users: [], user: "" } as UserState),
  actions: {
    async getUsers() {
      if (isInit) return;
      const users = (await UsersService.getUsers()) || [];
      this.users = [...users];
      isInit = true;
    },
    async add(user: VkUser) {
      await UsersService.add(user);
      this.users?.push(user);
    },
  },
});
