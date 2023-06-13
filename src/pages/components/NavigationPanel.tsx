import { FC } from "react";
import { NavLink } from "react-router-dom";

export const NavigationPanel: FC = () => {
  return <nav>
    <NavLink to="/">Меню на сегодня</NavLink>
    <NavLink to="/dishes">Список блюд</NavLink>
  </nav>
}