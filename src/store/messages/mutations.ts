import { MutationTree } from 'vuex'
import { MessagesState } from './types'
import { VkMessage } from '~/services/types'

export enum MutationTypes {
  SET_MESSAGES = 'SET_MESSAGES',
  SET_LOADING = 'SET_LOADING'
}

const mutations = {
  [MutationTypes.SET_MESSAGES](state: MessagesState, messages: VkMessage[]) {
    state.messages = [...messages]
  },
  [MutationTypes.SET_LOADING](state, loading: boolean) {
    state.isLoading = loading
  },
} as MutationTree<MessagesState>

export default mutations
