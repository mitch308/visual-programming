// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: [
    '@/assets/sass/common.sass'
  ],
  app: {
    head: {
      title: '可视化编程'
    }
  }
})
