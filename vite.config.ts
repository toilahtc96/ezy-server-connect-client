import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }) => {
  console.log(loadEnv(mode, './'))
  process.env = { ...process.env, ...loadEnv(mode, './env') }

  return defineConfig({
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: require('./antd/vars.json'),
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      https: false,
      port: parseInt(process.env.VITE_APP_PORT) || 3000,
    },
  })
}
