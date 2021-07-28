import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import user from '~/store/user'
import messages from '~/store/messages'
import notifications from '~/store/notifications'
import { RootState } from '~/store/types'

export const key: InjectionKey<Store<RootState>> = Symbol('store')

export const store = createStore<RootState>({
  modules: {
    user,
    messages,
    notifications
  },
})

export function useStore() {
  return baseUseStore(key)
}
