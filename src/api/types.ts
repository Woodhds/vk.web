export interface VkMessage {
  id: number
  ownerId: number
  fromId: number
  likesCount: number
  repostsCount: number
  date: string
  owner: string
  text: string
  images: string[]
  isSelected: boolean
  messageCategoryId: number | null
  messageCategoryPredict: string | null
  userReposted: boolean
  category: string
  isAccept: boolean
  scores: PredictResult
}

export interface GetMessagesResponse {
  messages: VkMessage[]
}

export interface VkUser {
  id: number
  name: string
  avatar: string
}

export interface Category {
  id: number
  title: string
  color: string
}

export type PredictResult = Record<string, number>;