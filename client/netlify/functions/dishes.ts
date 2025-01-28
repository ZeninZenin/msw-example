import type { Handler, HandlerEvent } from "@netlify/functions";
import { Dish } from "../../src/types";

const dishes: Dish[] = [
  {
    id: '1',
    name: 'Овсяная каша с ягодами',
    calories: 400
  },
  {
    id: '3',
    name: 'Капучино'
  },
  {
    id: '4',
    name: 'Яблочный сок'
  },
  {
    id: '5',
    name: 'Вишневый компот'
  },
  {
    id: '6',
    name: 'Лапша с курицей',
    calories: 350

  },
  {
    id: '7',
    name: 'Греческий салат',
    calories: 250
  },
  {
    id: '8',
    name: 'Гуляш из свинины с рисом',
    calories: 600
  },
  {
    id: '9',
    name: 'Судак запеченый в сливочном соусе',
    calories: 500
  }
]

const handler: Handler = async (event: HandlerEvent) => {
  if (!event.path.endsWith('dishes')) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Тут ничего нет 🤷‍♂️' }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(dishes),
  };
};

export { handler };