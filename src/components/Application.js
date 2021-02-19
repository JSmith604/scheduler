import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment"

import "./Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Alice Jones",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar:"https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Mark McMorris",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar:"https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Chloe Kim",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];


export default function Application(props) {
  const url = "http://localhost:8001";
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
}
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  useEffect(() => {
    axios.get(url + "/api/days")
    .then((response) => {
      setDays(response.data);
    }, [])
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
}, [])

  

  const interviewSchedule = appointments.map (appointment => {
   return (
     <Appointment key={appointment.id} {...appointment} />
     )
 })
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
        {interviewSchedule} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



