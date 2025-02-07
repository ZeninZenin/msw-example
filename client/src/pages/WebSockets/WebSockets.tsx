import { Button, notification, Space, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { socket } from "../../socket";
import shortid from "shortid";
import { config } from "../../config";
import './style.css'

const { Title, Text } = Typography;

const getCount = async () => {
  const response = await fetch(`${config.API_URL}/count`)
  return response.text()
}

export const WebSocketExample: FC = () => {
  const [count, setCount] = useState(0)
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    getCount().then(count => setCount(+count))
  }, [])

  const handlePlusClick = () => {
    const reqId = shortid()

    const handleResponse = (event: MessageEvent) => {
      const eventData = JSON.parse(event.data)

      if (reqId !== eventData.reqId) {
        return
      }

      if (eventData.error) {
        api.error({ message: 'Проблема со счетчиком' })
      }

      if (eventData.result === 'ok') {
        setCount(count => count + 1)
      }

      socket.removeEventListener('message', handleResponse)
    }

    socket.addEventListener('message', handleResponse)
    socket.send(JSON.stringify({ reqId, action: 'plus' }))
  }

  const handleMinusClick = () => {
    const reqId = shortid()

    const handleResponse = (event: MessageEvent) => {
      const eventData = JSON.parse(event.data)

      if (reqId !== eventData.reqId) {
        return
      }

      if (eventData.error) {
        api.error({ message: 'Проблема со счетчиком' })
      }

      if (eventData.result === 'ok') {
        setCount(count => count - 1)
      }

      socket.removeEventListener('message', handleResponse)
    }

    socket.addEventListener('message', handleResponse)
    socket.send(JSON.stringify({ reqId, action: 'minus' }))
  }

  return <>
    {contextHolder}
    <Title>Пример WebSocket</Title>
    <Space size={48}>
      <Button className="counter-button" onClick={handlePlusClick}>+</Button>
      <Button className="counter-button" onClick={handleMinusClick}>-</Button>
      <Text className="counter-result">{count}</Text>
    </Space>
  </>
}