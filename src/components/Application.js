import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay }  from "../helpers/selectors"
import { queryHelpers } from "@testing-library/react";
import "./Application.scss";
import useApplicationData from "../hooks/useApplicationData"



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Alice Jones",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar:"https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Mark McMorris",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar:"https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Chloe Kim",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   }
// ];


export default function Application(props) {
 
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  
  const interviewers =getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            />
          </nav>
          <img
         className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
         { appointments }  
        
        <Appointment 
        interviewers= {[]}
        // key="last" 
        time="5pm" />
      </section>
    </main>
  );
}



