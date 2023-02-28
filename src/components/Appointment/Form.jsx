import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

////////////////////////////////////////////////////////////////////////
//            APPOINTMENT COMPONENT - FORM
////////////////////////////////////////////////////////////////////////

export default function Form(props) {
	// DECLARE FORM STATE FOR STUDENT AND INTERVIEWER
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	// RESETS STATE BACK TO DEFAULT
	const reset = () => {
		setStudent("");
		setError("");
		setInterviewer(null);
	};

	// CALL RESET & CANCEL EVENT HANDLER
	const cancel = () => {
		reset();
		props.onCancel();
	};

	// FORM VALIDATION
	const validate = () => {
		if (student === "") {
			setError("Student name cannot be blank");
			return;
		}
		if (!interviewer) {
			setError("Please select an interviewer");
			return;
		}
		setError("");
		props.onSave(student, interviewer);
	};

	// RENDER HTML
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form onSubmit={(event) => event.preventDefault()} autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={student}
						onChange={(event) => setStudent(event.target.value)}
						data-testid="student-name-input"
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button onClick={cancel} danger>
						Cancel
					</Button>
					<Button onClick={validate} confirm>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
