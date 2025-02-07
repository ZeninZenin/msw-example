import { Button } from "antd"
import { FC } from "react"
import { Action } from "../types"
import { socket } from "../../../socket"
import shortid from "shortid"

interface FeatureActionProps extends Action {
  handleResult: (actionResult: string) => void,
  featureId: string
  setLoadingState: (state: boolean) => void
}

export const FeatureAction: FC<FeatureActionProps> = ({ id, name, handleResult, featureId, setLoadingState }) => {
  const onClick = () => {
    setLoadingState(true)
    const reqId = shortid()
    const eventName = `${featureId}:${id}`

    const handler = (event: MessageEvent) => {
      const eventData = JSON.parse(event.data)

      if (!(eventData.reqId === reqId && eventData.action === `${eventName}:result`)) {
        return
      }

      handleResult(eventData.result)
      socket.removeEventListener('message', handler)
    }

    socket.addEventListener('message', handler)
    socket.send(JSON.stringify({ reqId, action: eventName }))
  }

  return <Button key={id} onClick={onClick}>{name}</Button>
}