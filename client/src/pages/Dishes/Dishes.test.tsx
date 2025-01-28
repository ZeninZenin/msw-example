import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { Dishes } from './Dishes'
import userEvent from '@testing-library/user-event'
import { server } from '../../mocks/server'
import { http, HttpResponse } from 'msw'
import { getAbsoluteUrl } from '../../mocks/utils'



// Тест правильности нотификации
const editResultNotificationTest = async (notificationText: string) => {
  render(<Dishes />)

  //1. Данные отобразились в таблице
  await screen.findByText('Фейковая Овсяная каша с ягодами')
  
  //2. Открываем форму редактирования
  const editButtons = await screen.findAllByTitle('Редактировать')
  userEvent.click(editButtons[0])
  await screen.findByText('Редактирование информации о блюде')

  //3. Изменяем значение в поле 'Название'
  const input = await screen.findByLabelText('Название')
  userEvent.type(input, '1234')

  //4. Подтверждаем изменения
  const confirmButton = await screen.findByRole('button', { name: 'Сохранить' })
  userEvent.click(confirmButton)

  //5. Проверяем, что показана правильная нотификация
  expect(await screen.findByText(notificationText)).toBeInTheDocument()
}




describe('Dishes Page', () => {
  // Проверяем, что при успешном сохранении показывается правильная нотификация
  it('Edit dish. Success', async () => {
    await editResultNotificationTest('Ok')
  })

  // Проверяем нотификацию в случае сохранения с уже существующим именем
  it('Edit dish. EXISTING_NAME Error', async () => {
    //Мокаем API редактирования специально для этого теста
    server.use(http.post(getAbsoluteUrl('/dishes/:dishId/edit'), () => {
      return HttpResponse.json({ message: 'EXISTING_NAME' }, { status: 400 })
    }))

    await editResultNotificationTest('Не Ok. Блюдо с таким названием уже существует')
  })

  // Проверяем нотификацию при неизвестной ошибке
  it('Edit dish. UNKNOWN Error', async () => {
    //Мокаем API редактирования специально для этого теста
    server.use(http.post(getAbsoluteUrl('/dishes/:dishId/edit'), () => {
      return HttpResponse.json({ message: 'UNKNOWN' }, { status: 500 })
    }))

    await editResultNotificationTest('Не Ok. Неизвестная ошибка')
  })

  // Проверка того, что изменение моков в предыдущем тесте не аффектит последующие
  it('Edit dish. Success-2', async () => {
    await editResultNotificationTest('Ok')
  })
})