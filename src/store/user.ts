import {defineStore} from "pinia";
import type {VkUser} from "~/services/types";
import UsersService from "~/services/users";
import type {UserState} from '~/store/types'

export const userUserStore = defineStore('user', {
  state: (): UserState => ({} as UserState),
  actions: {
    async getUsers() {
      if (this.users) return
      const users = (await UsersService.getUsers()) || []
      this.$state.users = [...users]
    },
    async add(user: VkUser) {
      await UsersService.add(user)
      this.users?.push(user)
    }
  }
})