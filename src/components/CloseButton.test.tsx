import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CloseButton from "./CloseButton";

it("shows the label and calls inputHandler.", async () => {
  const mockHandler = jest.fn();
  render(<CloseButton onClick={mockHandler} />);

  userEvent.click(screen.getByRole("button"));
  expect(mockHandler).toBeCalledTimes(1);
});
