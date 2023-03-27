import { api } from 'boot/axios';
import { VkGroupGetResponse } from 'src/api/types';

class GroupsService {
  async get(page: number, count: number) {
    return (await api.post<VkGroupGetResponse>('/groups', { page: page, count: count }))?.data.groups;
  }
}

export default new GroupsService();
