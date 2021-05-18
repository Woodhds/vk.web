import { ApiClient } from './apiClient'
import { VkUser } from './types'

class UsersService {
  private apiClient = new ApiClient()

  getUsers() {
    return this.apiClient.getAsync<VkUser>('/users')
  }

  authorize() {
    return this.apiClient.getAsync('/authorize')
  }
}

export default new UsersService()
