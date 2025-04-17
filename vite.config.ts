import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [ mkcert() ],
  server: {
    host: '192.168.1.141', // your LAN IP
    port: 443,
    cors: {
      origin: 'https://192.168.1.141:5041', // your API origin (adjust if needed)
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  },
})