import React from "react";
import classnames from "classnames";

export default function DayListItem(props) {
 const listItem = classnames("day-list__item", {
   "day-list__item--full": props.spots === 0,
   "day-list__item--selected": props.selected,
 })
  return (
    <li onClick={() => props.setDay(props.name)}
    className = {listItem}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} Spots Remaining</h3>
    </li>
  );
}

