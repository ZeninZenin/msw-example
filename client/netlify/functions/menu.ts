import type { Handler } from "@netlify/functions";
import { Dish, Menu } from "../../src/types";

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

const menu: Menu = {
  breakfast: {
    primaryDish: dishes[0],
    drink: dishes[1]
  },

  lunch: {
    primaryDish: dishes[4],
    drink: dishes[3],
    secondaryDish: dishes[6]
  },

  dinner: {
    primaryDish: dishes[7],
    drink: dishes[2],
    appetizer: dishes[5]
  }
}

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(menu),
  };
};

export { handler };