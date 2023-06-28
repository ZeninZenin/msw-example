import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { Menu } from '../../types'
import { MenuOfTheDay } from './components'
import { config } from '../../config'

const { Title } = Typography

const getMenu = async (): Promise<Menu> => {
  const response = await fetch(`${config.API_URL}/menu`)
  return response.json()
}

export const Root = () => {
  const [menu, setMenu] = useState<Menu | null>(null)

  useEffect(() => {
    getMenu().then(setMenu)
  }, [])

  return menu && (
    <>
      <Title>Меню на сегодня</Title>
      <MenuOfTheDay menu={menu} />
    </>
  )
}