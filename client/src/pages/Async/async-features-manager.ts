import { featureMockDefinitions, features } from "./fake-async-features"
import { AsyncFeatureRef } from "./types"
const { asyncFeaturesMocks } = import.meta.env.VITE_ENABLE_MSW ? await import('../../mocks/ws/handlers') : {}

export const registerMocks = asyncFeaturesMocks ? (featureIds?: string[]) => {
  for (const mocksFeatureId in featureMockDefinitions) {
    if (featureIds && !featureIds.includes(mocksFeatureId)) {
      continue
    }

    for (const mockActionId in featureMockDefinitions[mocksFeatureId]) {
      asyncFeaturesMocks.set(`${mocksFeatureId}:${mockActionId}`, featureMockDefinitions[mocksFeatureId][mockActionId])
    }
  }
} : () => { }

export const unregisterMocks = asyncFeaturesMocks ? () => {
  asyncFeaturesMocks.clear()
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
    registerMocks([featureId])
  }

  return features[featureId]
}