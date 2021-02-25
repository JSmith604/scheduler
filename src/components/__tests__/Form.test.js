import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const onSave = jest.fn();
  
  const { getByText, getByPlaceholderText  } = render(
    <Form 
      interviewers={interviewers} 
      onSave={onSave}
    />
  );
  const { getByTestId, queryByText } = render(
    <Form interviewers={interviewers} 
    name="Lydia Miller-Jones" 
    onSave={onSave}
    />
  );

    it("renders without student name if not provided", () => {
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    });

    it("renders with initial student name", () => {
      expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones"); 
    });

    it("validates that the student name is not blank", () => {
      fireEvent.click(getByText("Save"));
      expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
    });

  it("calls onSave function when the name is defined", () => {
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    fireEvent.click(getByTestId("save-button"));
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

})
