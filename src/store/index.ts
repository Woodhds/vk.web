import { createStore } from 'vuex'
import user from '~/store/user'
import { RootState } from '~/store/types'

const store = createStore<RootState>({
  modules: {
    user,
  },
})

export default store
