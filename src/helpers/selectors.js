////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {object} state
 * @param {string} day
 * @returns Array with appointment data for specific day
 */

export function getAppointmentsForDay(state, day) {
	const found = state.days.find((d) => day === d.name);

	if (state.days.length === 0 || !found) {
		return [];
	}

	return found.appointments.map((id) => state.appointments[id]);
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {object} state
 * @param {object} interview
 * @returns object w/ updated interviewer data
 */

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}

	const output = {
		student: interview.student,
		interviewer: state.interviewers[interview.interviewer],
	};

	return output;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {object} state
 * @param {string} day
 * @returns Array w/ available interviewers for specific day
 */

export function getInterviewersForDay(state, day) {
	const found = state.days.find((d) => day === d.name);

	if (state.days.length === 0 || !found) {
		return [];
	}

	return found.interviewers.map((id) => state.interviewers[id]);
}

/////////////////////////////////////////////////////////////////////
