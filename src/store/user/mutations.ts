import { MutationTree } from 'vuex'
import { UserState } from './types'
import { VkUser } from '~/services/types'

export enum MutationTypes {
  SET_USERS = 'SET_USERS',
  ADD_USER = 'ADD_USER'
}

const mutations = {
  [MutationTypes.SET_USERS](state, users: VkUser[]) {
    state.users = [...users]
  },
  [MutationTypes.ADD_USER](state, user: VkUser) {
    state.users?.push(user)
  },
} as MutationTree<UserState>

export default mutations
