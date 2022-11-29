import { api } from 'boot/axios'
import type { VkUser, VkUserListResponse } from './types'

class UsersService {
  async getUsers() {
    return (await api.get<VkUserListResponse>('/users')).data.users
  }

  async search(query: string) {
    return (await api.post<VkUserListResponse>('/users/search', {search: query})).data.users
  }

  async add(user: VkUser) {
    await api.post('/users', user)
  }

  async deleteUser(id: number) {
    await api.delete(`/users/${id}`)
  }
}

export default new UsersService()
