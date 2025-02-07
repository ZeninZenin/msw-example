import { WebSocketHandler } from "msw"
import { mockWebSocketLink } from "./handlers"

const counterPlusError = () => [
  mockWebSocketLink.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', event => {
      const { action, reqId } = JSON.parse(event.data as string)

      if (action === 'plus') {
        event.preventDefault()
        client.send(JSON.stringify({ reqId, error: '1' }))
      }
    })
  })
]


export const scenarios: Record<string, () => WebSocketHandler[]> = {
  counterPlusError
} 