export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:3001',
  ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW
}