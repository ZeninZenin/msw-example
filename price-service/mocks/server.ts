import { setupServer } from 'msw/node'
import { RequestHandler, rest } from 'msw'
import { STUB_DISHES } from './stubs'

const handlers: RequestHandler[] = [
  rest.get('http://localhost:3001/dishes', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(STUB_DISHES)
    )
  }),
]

export const mockServer = setupServer(...handlers)