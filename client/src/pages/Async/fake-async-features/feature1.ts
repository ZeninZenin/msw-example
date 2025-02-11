import { delay } from "msw";
import { AsyncFeature } from "../types";

export const feature1: AsyncFeature = {
  id: 'feature1',
  name: 'Feature 1',
  actions: [
    {
      name: 'Get apples',
      id: 'get-apples',
      render: result => '🍎'.repeat(result as number)
    },
    {
      name: 'Get pears',
      id: 'get-pears',
      render: result => '🍐'.repeat(result as number)
    }
  ]
}

export const feature1MocksDefinition = {
  'get-apples': async (): Promise<number> => {
    await delay(1000)
    return 5
  },
  'get-pears': (): number => 5
}