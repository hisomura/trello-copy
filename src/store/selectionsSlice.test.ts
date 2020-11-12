import multiCardDrag, { selectCards, toggleCardSelection, unselectAllCards, unselectCards } from "./selectionsSlice";

describe("multiCardDragSlice", () => {
  test("selects tasks", () => {
    const nextState = multiCardDrag(
      { selectedCardIds: [] },
      {
        type: selectCards.type,
        payload: { taskIds: ["id-1", "id-2"] },
      }
    );

    expect(nextState.selectedCardIds).toEqual(["id-1", "id-2"]);
  });

  test("unselects tasks", () => {
    const nextState = multiCardDrag(
      { selectedCardIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: unselectCards.type,
        payload: { taskIds: ["id-4", "id-6", "id-7"] },
      }
    );

    expect(nextState.selectedCardIds).toEqual(["id-1", "id-2", "id-3", "id-5"]);
  });

  test("unselects all tasks", () => {
    const nextState = multiCardDrag(
      { selectedCardIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: unselectAllCards.type,
      }
    );

    expect(nextState.selectedCardIds).toEqual([]);
  });

  test("toggle card selection", () => {
    const initialState = { selectedCardIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] };

    const nextState = multiCardDrag(initialState, { type: toggleCardSelection.type, payload: { taskId: "id-1" } });
    expect(nextState.selectedCardIds).toEqual(["id-2", "id-3", "id-4", "id-5", "id-6"]);

    const nextState2 = multiCardDrag(initialState, { type: toggleCardSelection.type, payload: { taskId: "id-6" } });
    expect(nextState2.selectedCardIds).toEqual(["id-1", "id-2", "id-3", "id-4", "id-5"]);

    const nextState3 = multiCardDrag(initialState, { type: toggleCardSelection.type, payload: { taskId: "id-7" } });
    expect(nextState3.selectedCardIds).toEqual(["id-1", "id-2", "id-3", "id-4", "id-5", "id-6", "id-7"]);
  });
});
