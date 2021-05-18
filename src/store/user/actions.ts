import { ActionTree } from 'vuex'
import UsersService from '../../services/users'
import { RootState } from '../types'
import { MutationTypes } from './mutations'
import { UserState } from './types'

export enum ActionTypes {
  getUsers = 'getUsers'
}

const actions = {
  async [ActionTypes.getUsers]({ commit, state }) {
    if (state.users) return
    const users = (await UsersService.getUsers()) || []
    commit(MutationTypes.SET_USERS, users)
  },
} as ActionTree<UserState, RootState>

export default actions
