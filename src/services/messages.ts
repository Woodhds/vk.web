import ApiClient from './apiClient'
import { VkMessage } from './types'

class MessageService {
  async getMessages(search = '') {
    return await ApiClient.getAsync<VkMessage[]>('/messages', { params: { search } })
  }
}

const messageService = new MessageService()

export default messageService
