import cards, { addCard, closeCards, deleteCards, moveCards, openCards, Card } from "./cardsSlice";

describe("cardsSlice", () => {
  const prevCards: Card[] = [
    { listId: "list-id-1", id: "id-1", name: "foobar1", archived: false, order: 1 },
    { listId: "list-id-1", id: "id-2", name: "foobar2", archived: false, order: 2 },
    { listId: "list-id-1", id: "id-3", name: "foobar3", archived: true, order: 3 },
    { listId: "list-id-1", id: "id-4", name: "foobar4", archived: true, order: 4 },
  ];

  test("addCard adds a new card.", () => {
    const nextCards = cards(prevCards, {
      type: addCard.type,
      payload: { name: "foobar", listId: "list-id-1" },
    });
    expect(nextCards.length).toBe(5);
    expect(nextCards[4].listId).toBe("list-id-1");
    expect(nextCards[4].name).toBe("foobar");
    expect(nextCards[4].archived).toBe(false);
    expect(nextCards[4].order).toBe(5);
  });

  test("deleteCards deletes a card.", () => {
    const nextCards = cards(prevCards, { type: deleteCards.type, payload: { ids: ["id-2"] } });
    expect(nextCards.length).toBe(3);
  });

  test("deleteCards deletes cards.", () => {
    const nextCards = cards(prevCards, { type: deleteCards.type, payload: { ids: ["id-1", "id-2", "id-3"] } });
    expect(nextCards.length).toBe(1);
  });

  test("closeCards closes cards.", () => {
    const nextCards = cards(prevCards, { type: closeCards.type, payload: { ids: ["id-1", "id-2"] } });
    expect(nextCards.filter((t) => t.archived).length).toBe(4);
  });

  test("openCards opens cards.", () => {
    const nextCards = cards(prevCards, { type: openCards.type, payload: { ids: ["id-3"] } });
    expect(nextCards.filter((t) => !t.archived).length).toBe(3);
    expect(nextCards[2]).toEqual({ listId: "list-id-1", id: "id-3", name: "foobar3", archived: false, order: 3 });
  });
});

describe("cardsSlice.moveCards", () => {
  const prevCards: Card[] = [
    { listId: "list-id-1", id: "id-1", name: "foobar1", archived: false, order: 1 },
    { listId: "list-id-1", id: "id-2", name: "foobar2", archived: false, order: 2 },
    { listId: "list-id-1", id: "id-3", name: "foobar3", archived: true, order: 3 },
    { listId: "list-id-1", id: "id-4", name: "foobar4", archived: true, order: 4 },
  ];
  test("moves cards to another Cards", () => {
    const nextCards = cards(prevCards, {
      type: moveCards.type,
      payload: { targetIds: ["id-1", "id-3"], fromListId: "list-id-1", toListId: "new-list-id1", index: 0 },
    });
    expect(nextCards).toEqual([
      { listId: "new-list-id1", id: "id-1", name: "foobar1", archived: false, order: 1 },
      { listId: "list-id-1", id: "id-2", name: "foobar2", archived: false, order: 1 },
      { listId: "new-list-id1", id: "id-3", name: "foobar3", archived: true, order: 2 },
      { listId: "list-id-1", id: "id-4", name: "foobar4", archived: true, order: 2 },
    ]);
  });
  test("moves cards to last of the same list.", () => {
    const nextCards = cards(prevCards, {
      type: moveCards.type,
      payload: { targetIds: ["id-1", "id-3"], fromListId: "list-id-1", toListId: "list-id-1", index: 2 },
    });
    expect(nextCards).toEqual([
      { listId: "list-id-1", id: "id-1", name: "foobar1", archived: false, order: 3 },
      { listId: "list-id-1", id: "id-2", name: "foobar2", archived: false, order: 1 },
      { listId: "list-id-1", id: "id-3", name: "foobar3", archived: true, order: 4 },
      { listId: "list-id-1", id: "id-4", name: "foobar4", archived: true, order: 2 },
    ]);
  });

  test("moves cards to first of the same list.", () => {
    const nextCards = cards(prevCards, {
      type: moveCards.type,
      payload: { targetIds: ["id-3", "id-4"], fromListId: "list-id-1", toListId: "list-id-1", index: 0 },
    });
    expect(nextCards).toEqual([
      { listId: "list-id-1", id: "id-1", name: "foobar1", archived: false, order: 3 },
      { listId: "list-id-1", id: "id-2", name: "foobar2", archived: false, order: 4 },
      { listId: "list-id-1", id: "id-3", name: "foobar3", archived: true, order: 1 },
      { listId: "list-id-1", id: "id-4", name: "foobar4", archived: true, order: 2 },
    ]);
  });
});
