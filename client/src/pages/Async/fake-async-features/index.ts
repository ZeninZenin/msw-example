import { AsyncFeature, MockDefinition } from "../types";
import { feature1, feature1MocksDefinition } from "./feature1";
import { feature2, feature2MocksDefinition } from "./feature2";

export const features: Record<string, AsyncFeature> = {
  feature1,
  feature2
}

export const featureMockDefinitions: Record<string, MockDefinition> = {
  feature1: feature1MocksDefinition,
  feature2: feature2MocksDefinition
}