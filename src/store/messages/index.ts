import { Module } from 'vuex'
import { RootState } from '../types'
import { MessagesState } from './types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = () => ({} as MessagesState)

const messages = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<MessagesState, RootState>

export default messages
