import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import { Dishes } from './Dishes'

jest.useFakeTimers()

describe('Dishes Page', () => {
  it('Edit dish. Success', async () => {
    const { baseElement } = render(<BrowserRouter><Dishes /></BrowserRouter>)
    expect(await screen.findByText('Овсяная каша с ягодами')).toBeInTheDocument()
    
    const editButton = baseElement.querySelector('tr button')
    userEvent.click(editButton as Element)
    expect(await screen.findByText('Редактирование информации о блюде')).toBeInTheDocument()

    const confirmButton = await screen.findByText('Сохранить')
    userEvent.click(confirmButton)
    expect(await screen.findByText('Ok')).toBeInTheDocument()
  })

  it('Edit dish. Error', async () => {
    const { baseElement } = render(<BrowserRouter><Dishes /></BrowserRouter>) 
    expect(await screen.findByText('Овсяная каша с ягодами')).toBeInTheDocument()

    const editButton = baseElement.querySelector('tr button')
    userEvent.click(editButton as Element)
    expect(await screen.findByText('Редактирование информации о блюде')).toBeInTheDocument()

    const input = baseElement.querySelector('form input') as HTMLInputElement
    fireEvent.change(input, { target: { value: '123' } })

    const confirmButton = await screen.findByText('Сохранить')
    userEvent.click(confirmButton)

    expect(await screen.findByText('Не Ok. Блюдо с таким названием уже существует')).toBeInTheDocument()
  })
})