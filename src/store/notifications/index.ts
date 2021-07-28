import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import type { NotificationState } from '~/store/notifications/types'
import type { RootState } from '~/store/types'

const state = () => ({
  success: false,
  message: '',
} as NotificationState)

const notifications = {
  namespaced: true,
  getters,
  actions,
  mutations,
  state,
} as Module<NotificationState, RootState>

export default notifications
