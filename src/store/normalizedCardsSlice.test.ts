import cards, { addCard, State } from "./normalizedCardsSlice";

describe("cardsSlice", () => {
  const prevState: State = {
    idsPerList: { "list-id-1": ["id-1", "id-2"] },
    archivedIds: ["id-3", "id-4"],
    entities: {
      "id-1": { id: "id-1", listId: "list-id-1", name: "foobar1", archived: false },
      "id-2": { id: "id-2", listId: "list-id-1", name: "foobar2", archived: false },
      "id-3": { id: "id-3", listId: "list-id-1", name: "foobar3", archived: true },
      "id-4": { id: "id-4", listId: "list-id-1", name: "foobar4", archived: true },
    },
  };

  test("addCard adds a new card.", () => {
    const nextState = cards(prevState, {
      type: addCard.type,
      payload: { name: "foobar", listId: "list-id-1" },
    });
    expect(nextState.idsPerList["list-id-1"].length).toBe(3);
    const newId = nextState.idsPerList["list-id-1"][2];
    expect(nextState.entities[newId].listId).toBe("list-id-1");
    expect(nextState.entities[newId].name).toBe("foobar");
    expect(nextState.entities[newId].archived).toBe(false);
  });
});
