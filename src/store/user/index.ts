import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { UserState } from '~/store/user/types'
import { RootState } from '~/store/types'

const state = () => ({} as UserState)

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<UserState, RootState>

export default user
