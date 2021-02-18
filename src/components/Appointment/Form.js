import React, {useState} from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";


export default function Form(props) {
  const [name, setName]=useState(props.name || "")
  const [interviewer, setInterviewer]=useState(props.interviewer || null)
  const reset = function () {
    setInterviewer(null)
    setName("")
  }
  const cancel = function (){
    reset()
    props.onCancel()
  }

  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name" 
          defaultValue={name}
          onChange={(event) => setName(this.value)} 

          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel} >Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
}