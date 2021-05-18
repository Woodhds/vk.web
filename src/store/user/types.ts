import { VkUser } from '~/services/types'

export interface UserState {
  user: string
  users?: VkUser[]
}
