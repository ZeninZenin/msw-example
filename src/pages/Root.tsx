import { useEffect, useState } from 'react'
import { Menu } from '../../types'
import { MenuOfTheDay, NavigationPanel } from './components'

const getMenu = async (): Promise<Menu> => {
  const response = await fetch(`${import.meta.env?.VITE_API_URL}/menu`)
  return response.json()
}

export const Root = () => {
  const [menu, setMenu] = useState<Menu | null>(null)

  useEffect(() => {
    getMenu().then(setMenu)
  }, [])

  return menu && (
    <>
      <NavigationPanel />
      <h1>Меню на сегодня</h1>
      <MenuOfTheDay menu={menu} />
    </>
  )
}

