import { MutationTree } from 'vuex'
import { NotificationState } from '~/store/notifications/types'

export enum MutationTypes {
  Success = 'SET_SUCCESS',
  Danger = 'SET_DANGER',
  Close = 'CLOSE'
}

const mutations = {
  [MutationTypes.Success](state: NotificationState, message: string) {
    state.success = true
    state.message = message
  },
  [MutationTypes.Close](state: NotificationState) {
    state.message = ''
    state.success = false
    state.error = false
  },
} as MutationTree<NotificationState>

export default mutations
