import ApiClient from './apiClient'
import type { VkMessage } from './types'

class MessageService {
  async getMessages(search = '') {
    return await ApiClient.getAsync<VkMessage[] | null>('/messages', { params: { search } })
  }

  async repost(messages: { id: number; owner_Id: number }[]) {
    return await ApiClient.postAsync('/repost', messages)
  }

  async save(ownerId: number, id: number, category: string) {
    return await ApiClient.postAsync(`messages/${ownerId}/${id}`, { category })
  }

  async like() {
    return await ApiClient.postAsync('/like')
  }

  async grab() {
    return await ApiClient.getAsync("/grab")
  }
}

const messageService = new MessageService()

export default messageService
