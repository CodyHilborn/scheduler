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

	// Update Spots -- Pass in appointment ID + updated appointments object
	// from book & cancel functions
	const updateSpots = (id, appointments) => {
		// Return new days array, only update day containing the appointment id.
		const updatedDays = state.days.map((day) => {
			if (day.appointments.includes(id)) {
				let numOfSpots = 0;

				day.appointments.forEach((appointmentId) => {
					// If interview is set to null, add to spots counter.
					if (!appointments[appointmentId].interview) {
						numOfSpots++;
					}
				});
				// Add updated day to array.
				return {
					...day,
					spots: numOfSpots,
				};
			}
			// Add non-updated day to array.
			return day;
		});
		return updatedDays;
	};

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

		const days = updateSpots(id, appointments);

		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			setState({
				...state,
				appointments,
				days,
			});
		});
	};

	// CANCEL INTERVIEW FUNCTION
	const cancelInterview = async (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const days = updateSpots(id, appointments);

		return axios.delete(`/api/appointments/${id}`).then(() =>
			setState({
				...state,
				appointments,
				days,
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
