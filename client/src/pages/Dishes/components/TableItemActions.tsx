import { EditOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { FC, useState } from "react";
import { EditDishForm } from "./EditDishForm";
import { Dish } from "../../../types";
import { config } from "../../../config";

const ERRORS: Record<string, string> = {
  EXISTING_NAME: 'Блюдо с таким названием уже существует',
  UNKNOWN: 'Неизвестная ошибка'
}

const editDish = (dish: Dish) => {
  return fetch(`${config.API_URL}/dishes/${dish.id}/edit`, { method: 'POST', body: JSON.stringify(dish) })
}

export const TableItemActions: FC<{ id: string }> = ({ id }) => {
  const [api, contextHolder] = notification.useNotification();
  const [editFormOpen, setEditFormVisibilityState] = useState(false)

  const onConfirm = async (dish: Dish) => {
    const response = await editDish({...dish, id})

    if (response.ok) {
      api.success({ message: 'Ok' })
      setEditFormVisibilityState(false)
    } else {
      const error = await response.json()
      api.error({ message: `Не Ok. ${ERRORS[error.message as string]}`, })
    }
  }

  return (
    <>
      {contextHolder}
      <Button onClick={() => setEditFormVisibilityState(true)} title="Редактировать">
        <EditOutlined />
      </Button>
      <EditDishForm dishId={id} open={editFormOpen} onConfirm={onConfirm} onCancel={() => setEditFormVisibilityState(false)} />
    </>
  )
}