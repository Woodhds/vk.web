import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import user from '~/store/user'
import messages from '~/store/messages'
import { RootState } from '~/store/types'

export const key: InjectionKey<Store<RootState>> = Symbol('store')

export const store = createStore<RootState>({
  modules: {
    user,
    messages,
  },
})

export function useStore() {
  return baseUseStore(key)
}
