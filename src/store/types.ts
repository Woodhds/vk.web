import { MessagesState } from './messages/types'
import { UserState } from './user/types'

export interface RootState {
  messages: MessagesState
  user: UserState
}
