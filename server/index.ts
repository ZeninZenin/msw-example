import fastify from "fastify";
import { fastifyWebsocket } from "@fastify/websocket";
import cors from '@fastify/cors'
import { dishes } from "./dishes";
import { menu } from "./menu";

const server = fastify(({ logger: true }))
let count = 0

server.get('/dishes', async () => {
  return dishes
})

server.get('/menu', async () => {
  return menu
})

server.get('/count', async () => {
  return count
})

const getRandomNumber = () => Math.round(Math.random() * 4 + 1)


const start = async () => {
  try {
    server.register(fastifyWebsocket)
    server.register(async function (fastify) {
      fastify.get('/', { websocket: true }, socket => {
        socket.on('message', async event => {
          const { action, reqId } = JSON.parse(event.toString())
         
          if (action === 'plus') {
            count += 1
            socket.send(JSON.stringify({ reqId, result: 'ok' }))
            return
          }

          if (action === 'minus') {
            count -= 1
            socket.send(JSON.stringify({ reqId, result: 'ok' }))
            return
          }

          if (action === 'feature1:get-apples') {
            await new Promise(resolve => setTimeout(() => resolve(0), 1000))
            socket.send(JSON.stringify({ reqId, action: `${action}:result`, result: getRandomNumber() }))
            return
          }

          if (action === 'feature1:get-pears') {
            await new Promise(resolve => setTimeout(() => resolve(0), 1000))
            socket.send(JSON.stringify({ reqId, action: `${action}:result`, result: getRandomNumber() }))
            return
          }

          if (action === 'feature2:get-fruits') {
            await new Promise(resolve => setTimeout(() => resolve(0), 1000))
            socket.send(JSON.stringify({ 
              reqId,
              action: `${action}:result`,
              result: {
                apples: getRandomNumber(),
                pears: getRandomNumber()
              } }))
          }
        })
      })
    })
    await server.register(cors)
    await server.listen({ port: 3001 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()