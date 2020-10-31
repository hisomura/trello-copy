import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "./testUtils";
import App from "./App";

describe('App.tsx', () => {
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

  it("archives a list", async () => {
    render(<App />, {
      initialState: {
        lists: [{ boardId: "board-id-1", id: "list-id-1", name: "first list", archived: false, order: 1 }],
      },
    });

    userEvent.click(screen.getByRole("button"));
    await userEvent.type(document.activeElement!, "NewTodoList{enter}");
    expect(screen.queryByText(/first list/)).toBeNull();
  });
})
