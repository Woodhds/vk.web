import {defineStore} from 'pinia';
import {MessagesState} from 'stores/types';
import messageService from 'src/api/messages';

export const useMessagesStore = defineStore('messages', {
  state: (): MessagesState => ({messages: []} as MessagesState),
  actions: {
    async getMessages(
      search: string
    ) {
      const messages = await messageService.getMessages(search);
      this.messages = [...messages || []]
    },
    async repost(
      reposts: { ownerId: number; id: number }[]
    ) {
      await messageService.repost(
        reposts.map((f) => ({
          owner_Id: f.ownerId,
          id: f.id,
        }))
      );
      const message = this.messages.filter((f) =>
        reposts.some((a) => a.id === f.id && a.ownerId === f.ownerId)
      )

      const ids = message.map(a => `${a.id}_${a.ownerId}`)
      for (let i = 0; i < this.$state.messages.length; i++) {
        for (let j = 0; j < ids.length; j++) {
          if (`${this.messages[i].id}_${this.messages[i].ownerId}` === ids[j]) {
            this.messages[i].userReposted = true
          }
        }
      }
    }
  }
})
