import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

////////////////////////////////////////////////////////////////////////
//            APPOINTMENT COMPONENT - INDEX
////////////////////////////////////////////////////////////////////////

export default function Appointment(props) {
	// MODE CONSTANTS
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDIT = "EDIT";

	// DESTRUCT useVisualMode FUNCTION:
	// mode = state, transition(newMode, replace = false), back()
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		// SHOW SAVING INDICATOR
		transition(SAVING);
		// THEN CALL BOOK INTERVIEW FUNCTION FROM APPLICATION.JS
		props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch((err) => console.log(err));
	}

	function deleteInterview() {
		transition(DELETING);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch((err) => console.log(err));
	}

	// RENDER HTML
	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
			{mode === SAVING && <Status message={"Saving"} />}
			{mode === CONFIRM && (
				<Confirm
					message={"Are you use you want to delete?"}
					onCancel={() => back()}
					onConfirm={deleteInterview}
				/>
			)}
			{mode === DELETING && <Status message={"Deleting"} />}
			{mode === EDIT && (
				<Form
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
		</article>
	);
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
