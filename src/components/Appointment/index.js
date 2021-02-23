import React from "react";
import Styles from "./styles.scss";
import Header from "./Header";

import Empty from "./Empty";

import Show from "./Show";
import { create } from "react-test-renderer";
import useVisualMode from "hooks/useVisualMode";

import Status from "./Status";

// import Error from "components/Appointment/Error";

import Form from "./Form";

import Confirm from "./Confirm";

import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW: EMPTY
  );

  
 const save = function(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
  };
  

  transition(SAVING)
  props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW);
    });

   
  };

  const deleteInterview = function(id) {
    props.deleteInterview(id)
    .then (() => {
      transition(EMPTY);
    });
  }
  

  return (
   
    <article className="appointments">
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
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
      {mode === SAVING && (
        <Status message= "Saving Interview"/>
      )}
      {mode === CONFIRM && (
        <Confirm message = "Are you sure you want to delete the interview?"
        onConfirm={() => deleteInterview(props.id)}
        onCancel={() => back()}
        />
        
      )}
    </article>
  ) 
}
