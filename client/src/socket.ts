import { config } from "./config"

if (config.ENABLE_MSW) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

export const socket = new WebSocket(config.WS_URL)

