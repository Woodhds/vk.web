import { MutationTree } from 'vuex'
import { UserState } from './types'
import { VkUser } from '~/services/types'

export enum MutationTypes {
  SET_USERS = 'SET_USERS'
}

const mutations = {
  [MutationTypes.SET_USERS](state, users: VkUser[]) {
    state.users = [...users]
  },
} as MutationTree<UserState>

export default mutations
