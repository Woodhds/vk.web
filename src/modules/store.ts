import {createPinia} from "pinia";
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(createPinia())
}
