import React from "react";

import  DayListItem  from "./DayListItem.js";



export default function DayList(props) {
  const days = props.days.map (day => {
    return (
    <DayListItem //Day that interviews can be booked and its attributes
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
    )
  })
  return (
  <ul>
    {days}
  </ul>
  )
}


