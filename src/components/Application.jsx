import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import 'components/Appointment';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

////////////////////////////////////////////////////////////////////////
//            APPLICATION COMPONENT
////////////////////////////////////////////////////////////////////////

export default function Application(props) {

  // STATE DECLARATION
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });


  const setDay = (day) => setState({ ...state, day });

  // API CALL FOR DATA
  // EMPTY DEPENDENCY ARRAY = CALL ONLY MADE ON FIRST RENDER, NO DEATH LOOP
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // SET ARRAYS W/ PROPER DATA USING SELECTOR HELPERS
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // BUILD APPOINTMENT COMPONENT ARRAY, GET THE INTERVIEWER DATA W/ SELECTOR HELPER
  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
    />;
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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////