import ApiClient from './apiClient'
import { VkMessage } from './types'

class MessageService {
  async getMessages(search = '') {
    return await ApiClient.getAsync<VkMessage[]>('/messages', { params: { search } })
  }

  async repost(messages: { id: number; owner_Id: number }[]) {
    return await ApiClient.postAsync('/repost', messages)
  }

  async save(ownerId: number, id: number, payload: { category: string; text: string }) {
    return await ApiClient.postAsync(`messages/${ownerId}/${id}`, { ...payload, ...{ category: 'Деньги' } })
  }
}

const messageService = new MessageService()

export default messageService
