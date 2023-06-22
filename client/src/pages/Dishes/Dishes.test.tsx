import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Dishes } from './Dishes'
import userEvent from '@testing-library/user-event'

jest.useFakeTimers()

describe('Dishes Page', () => {
  it('Edit dish. Success', async () => {
    render(<Dishes />)
    await screen.findByText('Овсяная каша с ягодами')
    
    const editButtons = await screen.findAllByTitle('Редактировать')
    userEvent.click(editButtons[0])
    await screen.findByText('Редактирование информации о блюде')

    const input = await screen.findByLabelText('Название')
    fireEvent.change(input, { target: { value: '1234' } })

    const confirmButton = await screen.findByRole('button', { name: 'Сохранить' })
    userEvent.click(confirmButton)

    expect(await screen.findByText('Ok')).toBeInTheDocument()
  })

  it('Edit dish. Error', async () => {
    render(<Dishes />) 
    await screen.findByText('Овсяная каша с ягодами')

    const editButtons = await screen.findAllByTitle('Редактировать')
    userEvent.click(editButtons[0])
    await screen.findByText('Редактирование информации о блюде')

    const input = await screen.findByLabelText('Название')
    fireEvent.change(input, { target: { value: '123' } })

    const confirmButton = await screen.findByRole('button', { name: 'Сохранить' })
    userEvent.click(confirmButton)

    expect(await screen.findByText('Не Ok. Блюдо с таким названием уже существует')).toBeInTheDocument()
  })
})