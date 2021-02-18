import React from "react";
import Styles from "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";

import Empty from "components/Appointment/Empty";

import Show from "components/Appointment/Show";

// import Status from "components/Appointment/Status";

// import Error from "components/Appointment/Error";

// import Form from "components/Appointment/Form";

export default function Appointment(props) {
 console.log(props);
  return (
   
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer} />) : (<Empty />)}
    </article>
    )
    
}
