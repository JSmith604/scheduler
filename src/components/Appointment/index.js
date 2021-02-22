import React from "react";
import Styles from "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";

import Empty from "components/Appointment/Empty";

import Show from "components/Appointment/Show";
import { create } from "react-test-renderer";
import useVisualMode from "hooks/useVisualMode";

// import Status from "components/Appointment/Status";

// import Error from "components/Appointment/Error";

import Form from "components/Appointment/Form";

import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  console.log("props", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW: EMPTY
  );

 
  
 const save = function(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
  };
  
  props.bookInterview(props.id, interview)
  transition(SHOW);
 
}
  // transition(SAVING)
  // props.bookInterview(props.id, interview)
    // .then(() => {
    //   transition(SHOW);
    // });
  
// };




console.log("mode", mode);
  return (
   
    <article className="appointments">
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={() => back()}
        // name = {props.interview.student}
        interviewers= {props.interviewers}
        // interviewer= {props.interview.interviewer}
        onSave={save}
        
        />
      )}
    </article>
  ) 
}
