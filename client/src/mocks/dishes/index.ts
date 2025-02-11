import { RequestHandler, http, HttpResponse } from "msw";
import { STUB_DISHES } from "./stubs";
import { getAbsoluteUrl } from "../utils";
import { Dish } from "../../types";

export const dishesHandlers: RequestHandler[] = [
  http.get(getAbsoluteUrl('/dishes'), () => {
    return HttpResponse.json<Dish[]>(STUB_DISHES)
  }),

  http.get<{ dishId: string }, null, Dish | undefined>(getAbsoluteUrl('/dishes/:dishId'), ({ params }) => {
    const { dishId } = params
    return HttpResponse.json<Dish | undefined>(STUB_DISHES.find(({ id }) => id === dishId))
  }),

  http.post<{ dishId: string }, Dish>(getAbsoluteUrl('/dishes/:dishId/edit'), async ({ request }) => {
    const dish = await request.json()

    if (dish.name === '1') {
      return HttpResponse.json({ message: 'EXISTING_NAME' }, { status: 400 })
    }

    return new HttpResponse(null, { status: 200 })
  }),
]