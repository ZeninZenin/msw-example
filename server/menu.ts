import { Menu } from "./types";
import { dishes } from "./dishes";

export const menu: Menu = {
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