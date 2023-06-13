import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  transformIgnorePatterns: ['node_modules/(?!(antd/es|rc-util/es|@ant-design/icons/es|@babel/runtime/helpers/esm))'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true
      }
    ],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
}

export default config