import { defineStore } from 'pinia'
import {UserState} from 'stores/types';
import {VkUser} from 'src/api/types';
import usersService from 'src/api/users'

let isInit = false

export const userUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    user: '',
  } as UserState),
  actions: {
    async getUsers() {
      if (isInit) {
        return
      }

      const users = (await usersService.getUsers()) || []
      this.users = [...users]
      isInit = true
    },
    async add(user: VkUser) {
      await usersService.add(user)
      this.users?.push(user)
    },
    async delete(id: number) {
      const idx = this.users.findIndex(f => f.id === id)

      if (idx >= 0) {
        await usersService.deleteUser(id)
        this.users.splice(idx, 1)
      }
    },
  },
})
