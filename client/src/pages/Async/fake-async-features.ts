import { delay } from "msw";
import { AsyncFeature } from "./types";

const feature1: AsyncFeature = {
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

const feature2: AsyncFeature = {
  id: 'feature2',
  name: 'Feature 2',
  actions: [
    {
      name: 'Get fruits',
      id: 'get-fruits',
      render: result => {
        const { apples, pears } = result as {apples: number, pears: number}
        return `${'🍎'.repeat(apples)} ${'🍐'.repeat(pears)}`
      }
    }
  ]
}

export const features: Record<string, AsyncFeature> = {
  feature1,
  feature2
}

export const featuresMocks: Record<string, Record<string, () => unknown | Promise<unknown>>> = {
  feature1: {
    'get-apples': async () => {
      await delay(1000)
      return 5
    },
    'get-pears': () => 5
  },
  feature2: {
    'get-fruits': () => ({
      apples: 5,
      pears: 5
    })
  }
}
