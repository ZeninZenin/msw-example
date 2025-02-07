import { ReactNode } from "react"

export interface Action {
  name: string,
  id: string,
  render: (result: unknown) => ReactNode
}

export interface AsyncFeatureRef {
  id: string,
  name: string,
}

export interface AsyncFeature extends AsyncFeatureRef {
  actions: Action[]
}
