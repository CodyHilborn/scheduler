import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

////////////////////////////////////////////////////////////////////////
//            APPOINTMENT COMPONENT - FORM
////////////////////////////////////////////////////////////////////////

export default function Form(props) {

  // DECLARE FORM STATE FOR STUDENT AND INTERVIEWER
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // RESETS STATE BACK TO DEFAULT
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  // CALL RESET & CANCEL EVENT HANDLER
  const cancel = () => {
    reset();
    props.onCancel();
  };


  // RENDER HTML
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////