import { api } from 'boot/axios'
import type { VkUser } from './types'

class UsersService {
  async getUsers() {
    return (await api.get<VkUser[]>('/users')).data
  }

  async search(query: string) {
    return (await api.get<VkUser[]>('/users/search', { params: { q: query } })).data
  }

  async add(user: VkUser) {
    await api.post('/users', user)
  }

  async deleteUser(id: number) {
    await api.delete('/users', {
      params: {
        id,
      },
    })
  }
}

export default new UsersService()
