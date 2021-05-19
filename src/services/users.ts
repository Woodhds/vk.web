import apiClient from './apiClient'
import { VkUser } from './types'

class UsersService {
  getUsers() {
    return apiClient.getAsync<VkUser>('/users')
  }

  authorize() {
    return apiClient.postAsync('/authorize')
  }
}

export default new UsersService()
