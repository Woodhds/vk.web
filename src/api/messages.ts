import ApiClient from "./apiClient";
import type { GetMessagesResponse } from "./types";

class MessageService {
  async getMessages(search = "") {
    return (
      (
        await ApiClient.postAsync<GetMessagesResponse>("/messages", {
          search,
        })
      ).messages ?? []
    );
  }

  async repost(messages: { id: number; owner_Id: number }[]) {
    return await ApiClient.postAsync("/repost", {messages });
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
}

const messageService = new MessageService();

export default messageService;
