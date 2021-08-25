import { MutationTree } from 'vuex'
import { MessagesState } from './types'
import { VkMessage } from '~/services/types'

export enum MutationTypes {
  SET_MESSAGES = 'SET_MESSAGES',
  SET_REPOSTED = 'SET_REPOSTED'
}

const mutations = {
  [MutationTypes.SET_MESSAGES](state: MessagesState, messages: VkMessage[]) {
    state.messages = [...messages]
  },
  [MutationTypes.SET_REPOSTED](_state, message: VkMessage[]) {
    const ids = message.map(a => `${a.id}_${a.ownerId}`)
    _state.messages.filter(a => ids.includes(`${a.id}_${a.ownerId}`)).forEach(x => {
      x.userReposted = true
    })
  },
} as MutationTree<MessagesState>

export default mutations
