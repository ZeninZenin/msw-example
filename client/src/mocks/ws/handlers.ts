import { ws } from "msw"
import { config } from "../../config"
import { scenariosConfig } from "../config"
import { scenarios } from "./scenarios"

export const mockWebSocketLink = ws.link(config.WS_URL)
export const asyncFeaturesMocks = new Map<string, () => unknown | Promise<unknown>>()

export const wsHandlers = [
  mockWebSocketLink.addEventListener('connection', ({ server }) => {
    server.connect()
  }),

  mockWebSocketLink.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', event => {
      const { action, reqId } = JSON.parse(event.data as string)

      if (action === 'minus') {
        event.preventDefault()
        client.send(JSON.stringify({ reqId, error: '1' }))
      }
    })
  }),

  ...Object.entries(scenariosConfig)
    .filter(([, enabled]) => enabled)
    .map(([scenario]) => scenarios[scenario]?.() ?? [])
    .flat(),

  mockWebSocketLink.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', async event => {
      const { action, reqId } = JSON.parse(event.data as string)
      const handler = asyncFeaturesMocks.get(action)

      if (!handler) {
        return
      }

      event.preventDefault()
      client.send(JSON.stringify({ reqId, action: `${action}:result`, result: await handler() }))
    })
  }),
]
