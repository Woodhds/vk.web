import apiClient from './apiClient'
import { VkUser } from './types'

class UsersService {
  getUsers() {
    return apiClient.getAsync<VkUser>('/users')
  }

  search(query: string) {
    return apiClient.getAsync<VkUser[]>('/users/search', { params: { q: query } })
  }
}

export default new UsersService()
