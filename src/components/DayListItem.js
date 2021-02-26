import React from "react";
import classnames from "classnames";
import DayListItemStyle from "components/DayListItem.scss";
import { getByText } from "@testing-library/react";

export default function DayListItem(props) {
 const dayClass = classnames("day-list__item", {
   "day-list__item--full": props.spots === 0,
   "day-list__item--selected": props.selected,
 })
 const formatSpots = function (props){
  return (
    <li onClick={() => props.setDay(props.name)}
    className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots || "no"} {props.spots === 1 ? "spot":"spots"}  remaining</h3>
    </li>
  );
 }
 return formatSpots(props);
}

