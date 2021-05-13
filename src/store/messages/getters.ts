import { GetterTree } from 'vuex'
import { RootState } from '../types'
import { MessagesState } from './types'

const getters = {
  messages: (state) => {
    return state.messages
  },
} as GetterTree<MessagesState, RootState>

export default getters
