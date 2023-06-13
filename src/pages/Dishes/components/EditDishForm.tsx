import { Form, Input, Modal } from "antd";
import { FC, useEffect } from "react";
import { Dish } from "../../../../types";
import { API_URL } from "../../../config";

interface EditDishFormProps {
  open: boolean
  dishId: string
  onConfirm: (dish: Dish) => Promise<void>
  onCancel: () => void
}

const getDishById = async (id: string): Promise<Dish> => {
  const response = await fetch(`${API_URL}/dishes/${id}`)
  return response.json()
}

export const EditDishForm: FC<EditDishFormProps> = ({
  open,
  dishId,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm<Dish>();

  useEffect(() => {
    if (open) {
      getDishById(dishId).then(form.setFieldsValue)
    }
  }, [dishId, open, form.setFieldsValue])

  return (
    <Modal
      open={open}
      title="Редактирование информации о блюде"
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onConfirm(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="editDish"
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="calories" label="Ккал/100г">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};