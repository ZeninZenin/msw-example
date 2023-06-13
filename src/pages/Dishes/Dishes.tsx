import { FC, useEffect, useState } from "react";
import { Table } from 'antd';
import { NavigationPanel } from "../components";
import { Dish } from "../../../types";
import { ColumnsType } from "antd/es/table";
import { TableItemActions } from "./components";
import { API_URL } from "../../config";

const getDishes = async () => {
  const response = await fetch(`${API_URL}/dishes`)
  return response.json()
}



const columns: ColumnsType<Dish> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: 'auto'
  },
  {
    title: 'Калории',
    dataIndex: 'calories',
    key: 'calories',
    width: '20%'
  },
  {
    key: 'actions',
    render: (_, { id }) => <TableItemActions id={id} />,
    width: '0'
  }
]

export const Dishes: FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([])

  useEffect(() => {
    getDishes().then(setDishes)
  }, [])

  return <>
    <NavigationPanel />
    <h1>Список блюд</h1>
    <Table columns={columns} dataSource={dishes.map(dish => ({ ...dish, key: dish.id }))} />
  </>
}