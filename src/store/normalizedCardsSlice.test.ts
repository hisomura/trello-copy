import cards, { addCard, archiveCards, moveCards, CardsState } from "./normalizedCardsSlice";

describe("cardsSlice", () => {
  const prevState: CardsState = {
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
    expect(nextState.idsPerList["list-id-1"]).toHaveLength(3);
    const newId = nextState.idsPerList["list-id-1"][2];
    expect(nextState.entities[newId].listId).toBe("list-id-1");
    expect(nextState.entities[newId].name).toBe("foobar");
    expect(nextState.entities[newId].archived).toBeFalsy();
  });

  test("addCard adds a new card to uninitialized list.", () => {
    const nextState = cards(prevState, {
      type: addCard.type,
      payload: { name: "foobar", listId: "list-id-x" },
    });
    expect(nextState.idsPerList["list-id-x"]).toHaveLength(1);
    const newId = nextState.idsPerList["list-id-x"][0];
    expect(nextState.entities[newId].listId).toBe("list-id-x");
    expect(nextState.entities[newId].name).toBe("foobar");
    expect(nextState.entities[newId].archived).toBeFalsy();
  });

  test("archiveCard archives a card.", () => {
    const nextState = cards(prevState, {
      type: archiveCards.type,
      payload: { ids: ["id-1", "id-2"] },
    });
    expect(nextState.idsPerList["list-id-1"].length).toBe(0);
    expect(nextState.entities["id-1"].archived).toBeTruthy();
    expect(nextState.entities["id-2"].archived).toBeTruthy();
    expect(nextState.archivedIds).toHaveLength(4);
  });
});

describe("cardsSlice.moveCards", () => {
  const prevState: CardsState = {
    idsPerList: {
      "list-id-1": ["id-1", "id-2", "id-4", "id-5"],
      "list-id-2": ["id-6", "id-7"],
      "list-id-3": [],
    },
    archivedIds: ["id-3"],
    entities: {
      "id-1": { id: "id-1", listId: "list-id-1", name: "foobar1", archived: false },
      "id-2": { id: "id-2", listId: "list-id-1", name: "foobar2", archived: false },
      "id-3": { id: "id-3", listId: "list-id-1", name: "foobar3", archived: true },
      "id-4": { id: "id-4", listId: "list-id-1", name: "foobar4", archived: false },
      "id-5": { id: "id-5", listId: "list-id-1", name: "foobar5", archived: false },
      "id-6": { id: "id-6", listId: "list-id-2", name: "foobar6", archived: false },
      "id-7": { id: "id-7", listId: "list-id-2", name: "foobar7", archived: false },
    },
  };

  test("moves cards to the head of the same list", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-4", "id-5"], toListId: "list-id-1", index: 0 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-4", "id-5", "id-1", "id-2"]);
  });

  test("moves cards to the end of the same list", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-1", "id-2"], toListId: "list-id-1", index: 4 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-4", "id-5", "id-1", "id-2"]);
  });

  test("moves cards to the head of another list.", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-1", "id-4"], toListId: "list-id-2", index: 0 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-2", "id-5"]);
    expect(nextCards.idsPerList["list-id-2"]).toEqual(["id-1", "id-4", "id-6", "id-7"]);

    expect(nextCards.entities["id-1"].listId).toBe("list-id-2");
    expect(nextCards.entities["id-4"].listId).toBe("list-id-2");
  });

  test("moves cards to the end of another list.", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-1", "id-4"], toListId: "list-id-2", index: 2 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-2", "id-5"]);
    expect(nextCards.idsPerList["list-id-2"]).toEqual(["id-6", "id-7", "id-1", "id-4"]);

    expect(nextCards.entities["id-1"].listId).toBe("list-id-2");
    expect(nextCards.entities["id-4"].listId).toBe("list-id-2");
  });

  test("moves cards to empty list", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-1", "id-4", "id-6"], toListId: "list-id-3", index: 0 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-2", "id-5"]);
    expect(nextCards.idsPerList["list-id-2"]).toEqual(["id-7"]);
    expect(nextCards.idsPerList["list-id-3"]).toEqual(["id-1", "id-4", "id-6"]);

    expect(nextCards.entities["id-1"].listId).toBe("list-id-3");
    expect(nextCards.entities["id-4"].listId).toBe("list-id-3");
    expect(nextCards.entities["id-6"].listId).toBe("list-id-3");
  });

  test("moves cards to uninitialized list", () => {
    const nextCards = cards(prevState, {
      type: moveCards.type,
      payload: { ids: ["id-1", "id-4", "id-6"], toListId: "list-id-x", index: 0 },
    });

    expect(nextCards.idsPerList["list-id-1"]).toEqual(["id-2", "id-5"]);
    expect(nextCards.idsPerList["list-id-2"]).toEqual(["id-7"]);
    expect(nextCards.idsPerList["list-id-x"]).toEqual(["id-1", "id-4", "id-6"]);

    expect(nextCards.entities["id-1"].listId).toBe("list-id-x");
    expect(nextCards.entities["id-4"].listId).toBe("list-id-x");
    expect(nextCards.entities["id-6"].listId).toBe("list-id-x");
  });
});
