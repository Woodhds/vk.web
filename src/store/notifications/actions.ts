import { ActionContext, ActionTree } from 'vuex'
import { NotificationState } from '~/store/notifications/types'
import { RootState } from '~/store/types'
import { MutationTypes } from '~/store/notifications/mutations'

export enum ActionTypes {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning'
}

const actions = {
  async [ActionTypes.Success]({ commit }: ActionContext<NotificationState, RootState>, message: string) {
    commit(MutationTypes.Success, message)
    setTimeout(() => {
      commit(MutationTypes.Close)
    }, 5000)
  },
} as ActionTree<NotificationState, RootState>

export default actions
