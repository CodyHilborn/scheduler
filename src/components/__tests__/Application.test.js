import React from "react";

import axios from "axios";

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	waitForElementToBeRemoved,
	queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

describe("Application", () => {
	it("defaults to Monday and changes the scheudle when a new day is selected", async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText("Monday"));
		fireEvent.click(getByText("Tuesday"));
		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, "Add"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		const day = getAllByTestId(container, "day-item").find((day) =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
	});

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	it("loads data, cancels an interview and increases the spots remaining for the first day by 1", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);

		fireEvent.click(getByAltText(appointment, "Delete"));

		expect(
			getByText(appointment, /are you sure you want to delete?/i)
		).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() => getByAltText(appointment, "Add"));

		const day = getAllByTestId(container, "day-item").find((day) =>
			queryByText(day, "Monday")
		);

		expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
	});

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	it("loads data, edits an interview and keeps the spots remaining the same", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);

		fireEvent.click(getByAltText(appointment, "Edit"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Cody Hilborn" },
		});

		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Cody Hilborn"));

		const day = getAllByTestId(container, "day-item").find((day) =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
	});

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	it("shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();

		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, "Add"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Error"));

		expect(
			getByText(appointment, "Unable to save appointment. Sorry!")
		).toBeInTheDocument();
	});

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	it("shows the delete error when failing to delete an existing appointment", async () => {
		axios.delete.mockRejectedValueOnce();

		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);

		fireEvent.click(getByAltText(appointment, "Delete"));

		expect(
			getByText(appointment, /are you sure you want to delete?/i)
		).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Error"));

		expect(
			getByText(appointment, "Unable to delete appointment. Sorry!")
		).toBeInTheDocument();
	});
});
