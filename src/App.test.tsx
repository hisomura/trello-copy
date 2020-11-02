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

  it("archives a card", async () => {
    render(<App />, {
      initialState: {
        lists: [{ boardId: "board-id-1", id: "list-id-1", name: "first list", archived: false, order: 1 }],
        cards: {
          idsPerList: { "list-id-1": ["id-1", "id-2"] },
          archivedIds: ["id-3", "id-4"],
          entities: {
            "id-1": { id: "id-1", listId: "list-id-1", name: "foobar1", archived: false },
            "id-2": { id: "id-2", listId: "list-id-1", name: "foobar2", archived: false },
            "id-3": { id: "id-3", listId: "list-id-1", name: "foobar3", archived: true },
            "id-4": { id: "id-4", listId: "list-id-1", name: "foobar4", archived: true },
          },
        }
      },
    });

    expect(screen.queryByText(/foobar1/)).toBeInTheDocument()
    await userEvent.type(screen.getAllByRole("checkbox")[0], "Add Test.{enter}");
    expect(screen.queryByText(/foobar1/)).toBeNull();
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
