import { RequestHandler, rest } from "msw";
import { STUB_DISHES } from "./stubs";
import { Dish } from "../../../types";
import { getAbsoluteUrl } from "../utils";

export const dishesHandlers: RequestHandler[] = [
  rest.get(getAbsoluteUrl('/dishes'), (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(STUB_DISHES)
    )
  }),

  rest.get<null, { dishId: string }, Dish | undefined>(getAbsoluteUrl('/dishes/:dishId'), (req, res, ctx) => {
    const { dishId } = req.params

    return res(
      ctx.status(200),
      ctx.json(STUB_DISHES.find(({ id }) => id === dishId))
    )
  }),

  rest.post<Dish, { dishId: string }>(getAbsoluteUrl('/dishes/:dishId/edit'), async (req, res, ctx) => {
    const dish: Dish = await req.json()

    if (dish.name === '123') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Блюдо с таким названием уже существует' })
      )
    }

    return res(
      ctx.status(200)
    )
  }),
]