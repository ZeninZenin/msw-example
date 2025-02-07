import { Col, Row, Switch, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { AsyncFeature, AsyncFeatureRef } from "./types";
import { onAnnounceFeature, registerMocks, requestFeatureApi, unregisterMocks } from "./async-features-manager";
import { FeatureCard } from "./components";
import './style.css'

const { Title, Text } = Typography;

export const AsyncExample: FC = () => {
  const [features, setFeatures] = useState<(AsyncFeature | AsyncFeatureRef)[]>([])
  const [areMocksEnabled, setMocksState] = useState<boolean>(import.meta.env.VITE_ENABLE_MSW)

  useEffect(() => {
    onAnnounceFeature(async feature => {
      setFeatures(features => {
        for (const featureIndex in features) {
          if (features[featureIndex].id === feature.id) {
            const newFeatures = [...features]
            newFeatures[featureIndex] = feature
            return newFeatures
          }
        }

        return [...features, feature]
      })

      const featureApi = await requestFeatureApi(feature.id)
      setFeatures(features => features.map((feature) => feature.id === featureApi.id ? featureApi : feature))
    })
  }, [])

  const turnOffMocks = () => {
    setMocksState(false)
    unregisterMocks()
  }

  const turnOnMocks = () => {
    setMocksState(true)
    registerMocks()
  }

  return <>
    <Title>Пример асинхронной подгрузки моков</Title>
    {import.meta.env.VITE_ENABLE_MSW && 
      <label className="mocks-switch">
        <Switch checked={areMocksEnabled} onChange={value => value ? turnOnMocks() : turnOffMocks()} />
        <Text>Mocks</Text>
      </label>
    }
    <Row gutter={32}>
      {features.map((feature) => 
        <Col key={feature.id} span={8}>
          <FeatureCard {...feature} />
        </Col>)
      }
    </Row>
  </>
}