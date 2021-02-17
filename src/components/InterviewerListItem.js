import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";
import InterviewerListItemStyle from "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const interviewers = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })
  return (
    <li className={interviewers} onClick={() =>props.SetInterviewer(props.id)}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}>
      </img>
      <h2>{props.name} </h2>
    </li>
  );
}