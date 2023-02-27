import { useState, useEffect } from "react";
import axios from "axios";

////////////////////////////////////////////////////////////////////////
//            CUSTOM HOOK - USE APPLICATION DATA
////////////////////////////////////////////////////////////////////////

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	// API CALL FOR DATA
	// EMPTY DEPENDENCY ARRAY = CALL ONLY MADE ON FIRST RENDER, NO DEATH LOOP
	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	// BOOK INTERVIEW FUNCTION
	const bookInterview = async (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
			setState({
				...state,
				appointments,
			})
		);
	};

	// CANCEL INTERVIEW FUNCTION
	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.delete(`/api/appointments/${id}`).then(() =>
			setState({
				...state,
				appointments,
			})
		);
	};

	// Functions/State to return to main Application component
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
