import React from "react";
import Styles from "./styles.scss";
import Header from "./Header";

import Empty from "./Empty";

import Show from "./Show";

import useVisualMode from "hooks/useVisualMode";

import Status from "./Status";

import Error from "./Error";

import Form from "./Form";

import Confirm from "./Confirm";



const EMPTY = "EMPTY"; //Visual modes
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  
const { mode, transition, back } = useVisualMode( 
  props.interview ? SHOW: EMPTY
);

 const save = function(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
    
  };
  
  transition(SAVING)  //Visual mode transition after interview is saved or error when saving 
  props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW);
    })
    .catch ((err) => {
      transition(ERROR_SAVE, true);
    })
  };

  const deleteInterview = function(id) { //Visual mode transition when interview is deleted or fails to delete
    transition(DELETING)
    props.deleteInterview(id)
    .then (() => {
      transition(EMPTY);
    })
    .catch((err) => {
      transition(ERROR_DELETE, true);
    })
  }

  

  

  return (  //Messages for user in various modes
   
    <article className="appointments"
      data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && props.id && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={() => back()}
        interviewers= {props.interviewers}
        onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message= "Saving Interview"/>
      )}
      {mode === CONFIRM && (
        <Confirm message = "Are you sure you want to delete the interview?"
        onConfirm={() =>  deleteInterview(props.id)}
        onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status message= "Deleting Interview"
        />
      )}
      {mode === EDIT && (
         <Form onCancel={() => back()}
         name = {props.interview.student}
         interviewers= {props.interviewers}
         interviewer= {props.interview.interviewer.id}
         onSave={save}
         />
      )}
      {mode === ERROR_DELETE && (
        <Error message = "Could not cancel appointment"
        onCancel={() => back()}
        />
      )}
      {mode == ERROR_SAVE && (
        <Error message = "Could not save appointment"
        onCancel={() => back()}
        />
      )}
    </article>
  ) 
}
