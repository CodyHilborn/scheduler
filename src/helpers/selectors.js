////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// Search state.days arr for day matching name, returns new array with appointment data
export function getAppointmentsForDay(state, day) {
  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) {
    return [];
  }

  return found.appointments.map(id => state.appointments[id]);
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// If interview is booked, replace interviewer id with full interviewer data
export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const output = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return output;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// Search state.days array for day matching name, return new array w/ interviewer data
export function getInterviewersForDay(state, day) {
  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) {
    return [];
  }

  return found.interviewers.map(id => state.interviewers[id]);
}


/////////////////////////////////////////////////////////////////////