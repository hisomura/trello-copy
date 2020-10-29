import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "./testUtils";
import App from "./App";

it("adds a card", async () => {
  render(<App />, {
    initialState: {
      lists: [{ boardId: "board-id-1", id: "list-id-1", name: "first list", archived: false, order: 1 }],
    },
  });
  expect(screen.queryByText(/Add Test/)).toBeNull();
  await userEvent.type(screen.getByRole("textbox"), "Add Test.{enter}");
  expect(await screen.findByText(/Add Test/)).toBeInTheDocument();
});

it("adds a list", async () => {
  render(<App />);

  userEvent.click(screen.getByText(/New Todo List/));
  await userEvent.type(document.activeElement!, "NewTodoList{enter}");
  expect(await screen.findByText(/NewTodoList/)).toBeInTheDocument();
});
