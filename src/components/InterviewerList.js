import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import InterviewerListStyle from "components/InterviewerList.scss";
import classnames from "classnames";


export default function InterviewerList(props) {
  const interviewerElements = props.interviewers.map (interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)} />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.array}</h4>
      <ul className="interviewers__list">{interviewerElements}</ul>
    </section>
  )
}








