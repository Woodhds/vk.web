import type { VkMessage } from '~/services/types'

export interface MessagesState {
  messages: VkMessage[]
  isLoading: boolean
}
