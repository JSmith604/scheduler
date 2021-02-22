import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay }  from "../helpers/selectors"
import { queryHelpers } from "@testing-library/react";
import "./Application.scss";


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
  const url = "http://localhost:8001";
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  let dailyAppointments = [];
  let schedule = [];
  
  const setDay = day => setState({ ...state, day });

  dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("dailyAppointments",dailyAppointments)

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log(id, interview);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }

  schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    console.log("appointment", appointment);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
       />
      )
    })
    
  useEffect(() => {
    Promise.all([
      axios.get(url + "/api/days"), 
      axios.get(url + "/api/appointments"), 
      axios.get(url + "/api/interviewers")
    ]).then((all => {
      console.log("all", all);
      
      const [daysResponse, aptsResponse, interviewersResponse] = all;
      console.log("daysResponse", daysResponse.data);
      console.log("apts", aptsResponse.data);
      console.log("interviewersResponse", interviewersResponse.data);
      setState({...state, 
        days: daysResponse.data,
        appointments: aptsResponse.data,
        interviewers: interviewersResponse.data
      });
    }))
    .catch((error) => {
      console.log(error);
    });
  }, []);



  
 

  // const bookInterview = function(id, interview) {
  //   console.log("Application.bookInterview()", id, interview);
    // oldAppointment = state.appointments[id];
    // const newAppointment = {
    //   ...oldAppointment
    // }
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: {...interview },
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };
  //   const url = `/api/appointments${id}`;
  //   axios.put(url, appointment)
  //     .then(() => {
  //       setState({ ...state, appointment});
  //     });
  // };



  
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
         { schedule }  
        
        <Appointment 
        interviewers= {[]}
        key="last" time="5pm" />
      </section>
    </main>
  );
}



