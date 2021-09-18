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
    for (let i = 0; i < _state.messages.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (`${_state.messages[i].id}_${_state.messages[i].ownerId}` === ids[j]) {
          _state.messages[i].userReposted = true
        }
      }
    }
  },
} as MutationTree<MessagesState>

export default mutations
