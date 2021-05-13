import { ApiClient } from './apiClient'
import { VkMessage } from './types'

class MessageService {
  private client: ApiClient

  constructor() {
    this.client = new ApiClient()
  }

  async getMessages(search = '') {
    return await this.client.getAsync<VkMessage[]>('/messages', { search })
  }
}

const messageService = new MessageService()

export default messageService
