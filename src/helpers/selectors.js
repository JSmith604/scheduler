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
      const interviewer = state.interviewers[interviewerID] //Created a new variable to hold the new interviewer object
      if(interview.interviewer) {
        return {student:interview.student, interviewer} //Created a new object that holds the value of the student and interviewer instead of modifying the exisiting interview object. Using student instead of name
      }
    }
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewerArray = [];
  let today = state.days.find(dayElement => {
    return dayElement.name === day;
  })
 if (today) {
  for (let interviewerID of today.interviewers) {
    const interviewerOBJ = state.interviewers[interviewerID] 
    interviewerArray.push(interviewerOBJ);
  }
 }
  return interviewerArray;
}


export function getRemainingSpotsForDay (day, appointments) {
    let availableSpots = 0;
    if(!day.appointments) {
      return [];
    }
    day.appointments.forEach( appointmentID => {
      if(appointments[appointmentID].interview === null) {
      availableSpots ++
      }
    })
    return availableSpots;
}

export function addSpotsRemainingPerDay (days, appointments) {
  const daysWithAvailableSpots = days.map(day => {
    return {...day, spots: getRemainingSpotsForDay(day, appointments)}
  })
  return daysWithAvailableSpots;
}