import ApiClient from "./apiClient";
import type { PredictResult, VkMessage } from "./types";

class MessageService {
  async getMessages(search = "") {
    return await ApiClient.getAsync<VkMessage[] | null>("/messages", {
      params: { search },
    });
  }

  async repost(messages: { id: number; owner_Id: number }[]) {
    return await ApiClient.postAsync("/repost", messages);
  }

  async save(ownerId: number, id: number, category: string) {
    return await ApiClient.postAsync(`messages/${ownerId}/${id}`, { category });
  }

  async like(ownerId: number, id: number) {
    return await ApiClient.postAsync(`/like/${ownerId}/${id}`);
  }

  async grab() {
    return await ApiClient.getAsync("/grab");
  }

  async predict(ownerId: number, id: number) {
    return await ApiClient.postAsync<{
      message: VkMessage;
      predict: PredictResult;
    }>(`predict/${ownerId}/${id}`);
  }
}

const messageService = new MessageService();

export default messageService
