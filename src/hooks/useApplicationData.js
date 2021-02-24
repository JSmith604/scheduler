import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getRemainingSpotsForDay, addSpotsRemainingPerDay }  from "../helpers/selectors"
import { queryHelpers } from "@testing-library/react";
import "../components/Application.scss";


const useApplicationData = function (intial) {
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

  function bookInterview(id, interview) { 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }  
    };
   
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = addSpotsRemainingPerDay(state.days, appointments)
    
    return axios.put(url + "/api/appointments/" + id, appointment) 
    .then(()=> {
      setState( prev => ({
        ...prev,
        appointments,
        days
      }));
    }) 
  }
  
  function deleteInterview(id) { 
    const appointment = {
      ...state.appointments[id],
      interview: null  
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const days = addSpotsRemainingPerDay(state.days, appointments)

    return axios.delete(url + "/api/appointments/" + id) 
    .then(()=> {
      setState({
        ...state,
        appointments,
        days
      });
    })   
  }
  
  
  schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
  
  }

  )
  useEffect(() => {
    Promise.all([
      axios.get(url + "/api/days"), 
      axios.get(url + "/api/appointments"), 
      axios.get(url + "/api/interviewers")
    ]).then((all => {
     
      
      const [daysResponse, aptsResponse, interviewersResponse] = all;
      
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

 return({state, setDay, bookInterview, deleteInterview});

}

export default useApplicationData;

