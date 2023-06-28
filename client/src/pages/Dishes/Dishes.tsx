import { FC, useEffect, useState } from "react";
import { Table, Typography } from 'antd';
import { ColumnsType } from "antd/es/table";
import { config } from "../../config";
import { Dish } from "../../types";
import { TableItemActions } from "./components";

const { Title } = Typography;

const getDishes = async () => {
  const response = await fetch(`${config.API_URL}/dishes`)
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
    <Title>Список блюд</Title>
    <Table columns={columns} dataSource={dishes.map(dish => ({ ...dish, key: dish.id }))} />
  </>
}