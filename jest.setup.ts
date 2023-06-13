import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { server } from './src/mocks/server'
import { jest } from '@jest/globals'

import fetch, {
  Headers,
  Request,
  Response,
} from 'node-fetch' 

globalThis.fetch = fetch
globalThis.Headers = Headers
globalThis.Request = Request
globalThis.Response = Response

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})