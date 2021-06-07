import { ActionTree } from 'vuex'
import UsersService from '../../services/users'
import { RootState } from '../types'
import { MutationTypes } from './mutations'
import { UserState } from './types'
import { VkUser } from '~/services/types'

export enum ActionTypes {
  getUsers = 'getUsers',
  add = 'add'
}

const actions = {
  async [ActionTypes.getUsers]({ commit, state }) {
    if (state.users) return
    const users = (await UsersService.getUsers()) || []
    commit(MutationTypes.SET_USERS, users)
  },
  async [ActionTypes.add]({ commit }, user: VkUser) {
    await UsersService.add(user)
    commit(MutationTypes.ADD_USER, user)
  },
} as ActionTree<UserState, RootState>

export default actions
