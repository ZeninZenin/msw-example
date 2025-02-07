import { features, featuresMocks } from "./fake-async-features"
import { AsyncFeatureRef } from "./types"
const { asyncFeaturesMocks } = import.meta.env.VITE_ENABLE_MSW ? await import('../../mocks/ws/handlers') : {}

export const registerMocks = asyncFeaturesMocks ? () => {
  for (const mocksFeatureId in featuresMocks) {
    for (const mockActionId in featuresMocks[mocksFeatureId]) {
      asyncFeaturesMocks.set(`${mocksFeatureId}:${mockActionId}`, featuresMocks[mocksFeatureId][mockActionId])
    }
  }
} : () => { }

export const unregisterMocks = asyncFeaturesMocks ? () => {
  for (const mocksFeatureId in featuresMocks) {
    for (const mockActionId in featuresMocks[mocksFeatureId]) {
      asyncFeaturesMocks.delete(`${mocksFeatureId}:${mockActionId}`)
    }
  }
} : () => { }

export const onAnnounceFeature = (cb: (feature: AsyncFeatureRef) => void) => {
  for (const featureId in features) {
    setTimeout(() => cb({ id: featureId, name: features[featureId].name }), 1000 + Math.random() * 2000)
  }
}

export const requestFeatureApi = async (featureId: string) => {
  await new Promise(resolve => {
    setTimeout(() => resolve(0), 1000 + Math.random() * 2000)
  })

  if (asyncFeaturesMocks) {
    registerMocks()
  }

  return features[featureId]
}