import React from "react";
import Styles from "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";

import Empty from "components/Appointment/Empty";

import Show from "components/Appointment/Show";
import { create } from "react-test-renderer";

// import Status from "components/Appointment/Status";

// import Error from "components/Appointment/Error";

// import Form from "components/Appointment/Form";
// CREATE 
// EMPTY
// SHOW



export default function Appointment(props) {
 console.log(props);
  // const { mode, transition, back } = useVisualMode(
  //   props.interview ? SHOW: EMPTY
  // );

//  const save = function() {
//   const interview = {
//     student: name,
//     interviewer,
//   };

//   transition(SAVING)
//   props.bookInterview(props.id, interview)
//     .then(() => {
//       transition(SHOW);
//     });
  
// };

// const bookInterview = function(id, interview) {
//   console.log("bookInterview()", id, interview);
// };




  return (
   
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer} />) : (<Empty />)}
    </article>
    )
    
}
