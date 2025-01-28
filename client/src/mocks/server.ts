import "cross-fetch/polyfill"
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)