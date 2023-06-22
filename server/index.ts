import fastify from "fastify";
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
    await server.register(cors)
    await server.listen({ port: 3001 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()