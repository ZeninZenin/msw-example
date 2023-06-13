import { FC } from "react";
import { Dish, Meal } from "../../../types";

interface DishesListProps {
  meal: Meal
}

interface DishesListItemProps {
  dish: Dish | undefined
}

const getCalories = (calories: number | undefined) => calories === undefined ? '' : ` (${calories}) Ккал`

const DishesListItem: FC<DishesListItemProps> = ({ dish }) => dish ? <li>{dish.name}{getCalories(dish.calories)}</li> : null

export const DishesList: FC<DishesListProps> = ({ meal }) => {
  const { primaryDish, drink, secondaryDish, appetizer, dessert } = meal

  return <ul>
    <DishesListItem dish={primaryDish} />
    <DishesListItem dish={secondaryDish} />
    <DishesListItem dish={appetizer} />
    <DishesListItem dish={drink} />
    <DishesListItem dish={dessert} />
  </ul>}