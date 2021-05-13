import type { ActionContext, ActionTree } from 'vuex'
import type { RootState } from '../types'
import type { MessagesState } from './types'
import { MutationTypes } from './mutations'
import messageService from '~/services/messages'

export enum ActionTypes {
  getMessages = 'getMesages'
}

const actions = {
  async [ActionTypes.getMessages]({ commit }: ActionContext<MessagesState, RootState>, search: string) {
    try {
      commit(MutationTypes.SET_LOADING, true)
      const messages = await messageService.getMessages(search)
      commit(MutationTypes.SET_MESSAGES, messages)
    }
    finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
} as ActionTree<MessagesState, RootState>

export default actions
