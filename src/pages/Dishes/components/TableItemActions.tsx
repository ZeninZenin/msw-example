import { EditOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { FC, useState } from "react";
import { EditDishForm } from "./EditDishForm";
import { Dish } from "../../../../types";
import { API_URL } from "../../../config";

const editDish = (dish: Dish) => {
  return fetch(`${API_URL}/dishes/${dish.id}/edit`, { method: 'POST', body: JSON.stringify(dish) })
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
      api.error({ message: `Не Ok. ${error?.message}`, })
    }
    
  }

  return (
    <>
      {contextHolder}
      <Button onClick={() => setEditFormVisibilityState(true)}>
        <EditOutlined />
      </Button>
      <EditDishForm dishId={id} open={editFormOpen} onConfirm={onConfirm} onCancel={() => setEditFormVisibilityState(false)} />
    </>
  )
}