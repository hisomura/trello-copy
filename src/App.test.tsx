import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "./testUtils";
import App from "./App";

describe("App.tsx", () => {
  const getInitialState = (state: {} = {}) => ({
    ...{
      boards: { ids: ["board-id-1"], entities: { "board-id-1": { id: "board-id-1", name: "Board 1" } } },
      lists: {
        ids: ["list-id-1"],
        entities: { "list-id-1": { boardId: "board-id-1", id: "list-id-1", name: "First List" } },
      },
      cards: { idsPerList: {}, archivedIds: [], entities: {} },
      selections: { selectedCardIds: [] },
    },
    ...state,
  });

  it("shows boards", async () => {
    const initialState = getInitialState({
      boards: {
        ids: ["board-id-1", "board-id-2", "board-id-3"],
        entities: {
          "board-id-1": { id: "board-id-1", name: "Board 1" },
          "board-id-2": { id: "board-id-2", name: "Board 2" },
          "board-id-3": { id: "board-id-3", name: "Board 3" },
        },
      },
    });
    render(<App />, { initialState });

    expect(screen.getByText(/Board 1/)).toBeInTheDocument();
    expect(screen.getByText(/Board 2/)).toBeInTheDocument();
    expect(screen.getByText(/Board 3/)).toBeInTheDocument();
  });

  it("adds a board", async () => {
    const initialState = getInitialState();
    render(<App />, { initialState });

    expect(screen.queryByText(/TestBoard/)).toBeNull();
    userEvent.click(screen.getByText(/\+ New Board/));
    await userEvent.type(document.activeElement!, "TestBoard{enter}");
    expect(await screen.findByText(/TestBoard/)).toBeInTheDocument();
  });

  it("shows a board detail page", async () => {
    const initialState = getInitialState();
    render(<App />, { initialState });

    userEvent.click(screen.getByText(/Board 1/));
    expect(await screen.findByText(/First List/)).toBeInTheDocument();
  });
});
