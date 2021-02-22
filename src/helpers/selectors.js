import React from "react"

export function getAppointmentsForDay(state, day) {
  console.log("state", state);
  console.log("day", day);
  let appointmentArray = [];
  for (let dayObj of state.days) {
    console.log("dayObj", dayObj);
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
  let today = state.days.find(dayElement => {
    return dayElement.name === day;
  })
  for (let interviewerID of today.interviewers) {
    const interviewerOBJ = state.interviewers[interviewerID] 
    interviewerArray.push(interviewerOBJ);
  }
  return interviewerArray;
}