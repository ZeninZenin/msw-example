import fastify from "fastify";
import { fastifyWebsocket } from "@fastify/websocket";
import cors from '@fastify/cors'
import { dishes } from "./dishes";
import { menu } from "./menu";

const server = fastify(({ logger: true }))

server.get('/dishes', async () => {
  return dishes
})

server.get('/menu', async () => {
  return menu
})

const start = async () => {
  try {
    server.register(fastifyWebsocket)

    server.register(async function (fastify) {
      fastify.get('/', { websocket: true }, socket => {
        socket.on('message', () => {
          socket.send('hi from server')
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