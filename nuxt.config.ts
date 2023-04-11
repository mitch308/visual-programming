// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss'
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
