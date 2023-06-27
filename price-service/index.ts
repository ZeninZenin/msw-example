import fastify from "fastify";
import axios from "axios"
import { Dish } from "./types";

const getPrice = () => parseFloat(`${Math.random() * 100}`).toFixed(2)
const setPriceForDish = (dish: Dish) => ({ ...dish, price: getPrice() })

const server = fastify(({ logger: true }))

server.get('/', async () => {
  const { data } = await axios.get<Dish[]>('http://localhost:3001/dishes')

  return data.map(dish => setPriceForDish(dish))
})

server.get('/pretty', async (_, reply) => {
  const { data } = await axios.get<Dish[]>('http://localhost:3001/dishes')

  reply.type('text/html')
  reply.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Что по чем?</title>
      </head>
      <body>
        <ul>
          ${data.map(({ name }) => `<li style="font-size: 48px">${name} - ${getPrice()}</li>`).join('')}
        </ul>
      </body>
    </html>`
  )
})

const start = async () => {
  try {
    if (process.env.WITH_MSW) {
      const { mockServer } = await import("./mocks/server")
      mockServer.listen()
    }

    await server.listen({ port: process.env.PORT ? +process.env.PORT : 3002 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()