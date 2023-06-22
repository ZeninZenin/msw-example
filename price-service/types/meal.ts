import { Dish } from "./dish";

export interface Meal {
  primaryDish: Dish
  drink: Dish
  secondaryDish?: Dish
  appetizer?: Dish
  dessert?: Dish
}