import { FC } from "react";
import { Menu } from "../../../types";
import { DishesList } from "./DishesList";
import { List } from "antd";

interface MenuOfTheDayProps {
  menu: Menu
}

export const MenuOfTheDay: FC<MenuOfTheDayProps> = ({ menu }) => {
  const { breakfast, lunch, dinner } = menu

  return <List>
    <List.Item>
      <List.Item.Meta title="Завтрак:" description={<DishesList meal={breakfast} />} />
    </List.Item>

    <List.Item>
      <List.Item.Meta title="Обед:" description={<DishesList meal={lunch} />} />
    </List.Item>

    <List.Item>
      <List.Item.Meta title="Ужин:" description={<DishesList meal={dinner} />} />
    </List.Item>
  </List>
}