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

export function getInterview(state, interview) {
    if(state.interviewers && interview) {
      const interviewerID = interview.interviewer
      interview.interviewer = state.interviewers[interviewerID]
      if(interview.interviewer) {
        return interview;
      }
    }
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewerArray = [];
  let appointmentsForDay = getAppointmentsForDay(state, day);

  for (let appointment of appointmentsForDay) {
    if(appointment.interview && appointment.interview.interviewer) {
      let id = appointment.interview.interviewer;
      let interviewerObj = state.interviewers[id];
      if(!interviewerArray.includes(interviewerObj)) {
        interviewerArray.push(interviewerObj);
      }
    } 
  }
  return interviewerArray;
}