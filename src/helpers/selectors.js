
export function getAppointmentsForDay(state, day) {
  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) {
    return [];
  }

  return found.appointments.map(id => state.appointments[id]);
}


/////////////////////////////////////////////////////////////////////


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