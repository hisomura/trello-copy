import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputBox from "./InputBox";

it("shows the label and calls inputHandler.", async () => {
  const mockHandler = jest.fn()
  render(<InputBox inputHandler={mockHandler} label='Test Label'/>)

  expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  userEvent.click(screen.getByText('Test Label'));
  await userEvent.type(document.activeElement!, "NewTodoList{enter}");
  expect(mockHandler).toBeCalledTimes(1);
  expect(mockHandler).toBeCalledWith("NewTodoList");
});
