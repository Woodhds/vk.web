import { UserModule } from '~/types'
import { store, key } from '~/store'

export const install: UserModule = ({ app }) => {
  app.use(store, key)
}
