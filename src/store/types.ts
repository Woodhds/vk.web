import type {VkMessage, VkUser} from "~/api/types";

export interface UserState {
  user: string | null
  users: VkUser[]
}

export interface NotificationState {
  success: boolean;
  danger: boolean;
  error: boolean;
  message: string;
}

export interface MessagesState {
  messages: VkMessage[]
}

export interface RootState {
  messages: MessagesState
  user: UserState
  notifications: NotificationState
}
