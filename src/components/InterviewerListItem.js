import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem (props) {
  const interviewers = classnames("interviewers-list__item", {
    "interviewers-list__item--selected": props.selected,
  })
  return (
    <li onClick={() =>props.SetInterviewer(props.name)}>
    <img
      className="interviewers__item-image"
     src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer">
      </img>
      <h2>Sylvia Palmer {props.avatar}</h2>
    </li>
  );
}


  
// export default function DayListItem(props) {
//   const dayClass = classnames("day-list__item", {
//     "day-list__item--full": props.spots === 0,
//     "day-list__item--selected": props.selected,
//   })
//   const formatSpots = function (props){
//    return (
//      <li onClick={() => props.setDay(props.name)}
//      className={dayClass}>
//        <h2 className="text--regular">{props.name}</h2> 
//        <h3 className="text--light">{props.spots || "no"} {props.spots === 1 ? "spot":"spots"}  remaining</h3>
//      </li>
//    );
//   }
//   return formatSpots(props);
//  }
 
 






