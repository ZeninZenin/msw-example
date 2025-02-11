import { AsyncFeature } from "../types"

export const feature2: AsyncFeature = {
  id: 'feature2',
  name: 'Feature 2',
  actions: [
    {
      name: 'Get fruits',
      id: 'get-fruits',
      render: result => {
        const { apples, pears } = result as GetFruitsResult
        return `${'🍎'.repeat(apples)} ${'🍐'.repeat(pears)}`
      }
    }
  ]
}

interface GetFruitsResult {
  apples: number
  pears: number
}

export const feature2MocksDefinition = {
  'get-fruits': (): GetFruitsResult => ({
    apples: 5,
    pears: 5
  })
}
