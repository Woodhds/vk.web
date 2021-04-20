/* eslint-disable import/no-duplicates */

declare global {
  interface Window {
    VK: any;
  }
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

// declare vue files as components
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module 'VK' {
  import { VKApi } from '~/types'
  const vkApi: VKApi
  export default vkApi
}
