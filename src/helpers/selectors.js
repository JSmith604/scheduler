import React from "react"

export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
  for (let dayObj of state.days) {

    if (dayObj.name === day) {
      for (let appointment of dayObj.appointments) {
        appointmentArray.push(state.appointments[appointment])
      }
      break;
    }
  }
  
  return appointmentArray;
}

// export function getInterviewerForAppointment()