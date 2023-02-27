import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
	getAppointmentsForDay,
	getInterviewersForDay,
	getInterview,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

////////////////////////////////////////////////////////////////////////
//            APPLICATION COMPONENT
////////////////////////////////////////////////////////////////////////

export default function Application(props) {
	// IMPORT FROM useApplicationData CUSTOM HOOK
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();

	// SET ARRAYS W/ PROPER DATA USING SELECTOR HELPERS
	const dailyInterviewers = getInterviewersForDay(state, state.day);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	// BUILD APPOINTMENT COMPONENT ARRAY, GET THE INTERVIEWER DATA W/ SELECTOR HELPER
	const appointmentArr = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={dailyInterviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	// RENDER HTML
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
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appointmentArr}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
