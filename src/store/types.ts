import { MessagesState } from './messages/types'
import { UserState } from './user/types'
import { NotificationState } from '~/store/notifications/types'

export interface RootState {
  messages: MessagesState
  user: UserState
  notifications: NotificationState
}
