import { Card, Spin } from "antd"
import { FC, ReactNode, useState } from "react"
import { Action, AsyncFeatureRef } from "../types"
import { FeatureAction } from "./FeatureAction"

interface FeatureCardProps extends AsyncFeatureRef {
  actions?: Action[]
} 

export const FeatureCard: FC<FeatureCardProps> = ({ id, name, actions }) => {
  const isLoading = !actions
  const [data, setData] = useState<ReactNode>('Empty')
  const [isDataLoading, setDataLoadingState] = useState(false)

  const handleResult = (data: ReactNode) => {
    setData(data)
    setDataLoadingState(false)
  }

  return <Card
    style={{
      borderWidth: 2
    }}
    hoverable
    styles={{
      title: {
        fontSize: 48
      },
      body: {
        fontSize: 32
      }
    }}
    key={id} 
    title={name}
    actions={isLoading 
      ? undefined
      : actions.map(action => <FeatureAction
         {...action} 
         featureId={id} 
         handleResult={result => handleResult(action.render(result))} 
         setLoadingState={setDataLoadingState}
         />
        )}
    loading={isLoading}
  >
    {isDataLoading ? <Spin /> : data}
</Card>
}