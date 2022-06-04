import apiClient from './apiClient'
import type { VkUser } from './types'

class UsersService {
  getUsers() {
    return apiClient.getAsync<VkUser[]>('/users')
  }

  search(query: string) {
    return apiClient.getAsync<VkUser[]>('/users/search', { params: { q: query } })
  }

  async add(user: VkUser) {
    await apiClient.postAsync('/users', user)
  }

  async deleteUser(id: number) {
    await apiClient.deleteAsync('/users', {
      params: {
        id,
      },
    })
  }
}

export default new UsersService()
