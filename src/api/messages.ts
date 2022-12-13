import { api } from 'boot/axios'
import {VkMessage} from './types';
import type { GetMessagesResponse } from './types';

class MessageService {
  async getMessages(search = '') {
    return (
      (
        await api.post<GetMessagesResponse>('/messages', {
          search,
        })
      ).data.messages ?? []
    );
  }

  async repost(messages: { id: number; owner_Id: number }[]) {
    return await api.post('/repost', {messages });
  }

  async update(ownerId: number, id: number) {
    return (await api.put<VkMessage>('/update', { ownerId, id }))?.data
  }

  async like(ownerId: number, id: number) {
    return await api.post(`/like/${ownerId}/${id}`);
  }

  async grab() {
    return await api.get('/grab');
  }
}

const messageService = new MessageService();

export default messageService;
