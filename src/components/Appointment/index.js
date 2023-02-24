import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

////////////////////////////////////////////////////////////////////////
//            APPOINTMENT COMPONENT - INDEX
////////////////////////////////////////////////////////////////////////

export default function Appointment(props) {

  // MODE CONSTANTS
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  // DESTRUCT useVisualMode FUNCTION: 
  // mode = state, transition(newMode, replace = false), back() 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // RENDER HTML
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
      {mode === CREATE && <Form
        interviewers={[]}
        onSave={() => console.log('Clicked onSave')}
        onCancel={() => back()}
      />}
    </article>
  );
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////