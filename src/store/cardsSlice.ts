import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidV4} from "uuid";
import {WritableDraft} from "immer/dist/types/types-external";

export type Card = {
  listId: string;
  id: string;
  name: string;
  archived: boolean;
  order: number;
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState: [] as Card[],
  reducers: {
    addCard: (cards, action: { payload: { listId: string; name: string } }) => {
      cards.push({
        listId: action.payload.listId,
        id: uuidV4(),
        name: action.payload.name,
        archived: false,
        order: cards.filter((t) => t.listId === action.payload.listId).length + 1,
      });
    },
    deleteCards: (cards, action: { payload: { ids: string[] } }) => {
      return cards.filter((t) => !action.payload.ids.includes(t.id));
    },
    closeCards: (cards, action: { payload: { ids: string[] } }) => {
      return cards.map((t) => (action.payload.ids.includes(t.id) ? {...t, archived: true} : t));
    },
    openCards: (cards, action: { payload: { ids: string[] } }) => {
      return cards.map((t) => (action.payload.ids.includes(t.id) ? {...t, archived: false} : t));
    },

    // TODO FIX implementation
    moveCards: (
      cards,
      action: { payload: { targetIds: string[]; fromListId: string; toListId: string; index: number } }
    ) => {
      if (action.payload.fromListId === action.payload.toListId) {
        const listCards = cards.filter((t) => t.listId === action.payload.toListId);
        const newCards: WritableDraft<Card>[] = [];
        const targetCards: WritableDraft<Card>[] = [];
        listCards.forEach((t) => {
          if (action.payload.targetIds.includes(t.id)) {
            targetCards.push(t);
          } else {
            newCards.push(t);
          }
        });
        newCards.splice(action.payload.index, 0, ...targetCards);
        newCards.forEach((t, index) => (t.order = index + 1));

        return;
      }
      const fromListCards = cards.filter((t) => t.listId === action.payload.fromListId);
      const toListCards = cards.filter((t) => t.listId === action.payload.toListId);

      const targetCards = fromListCards.filter((t) => {
        const isTarget = action.payload.targetIds.includes(t.id);
        if (isTarget && t.listId !== action.payload.fromListId)
          throw new Error(`card ${t.id} doesn't belong to list ${action.payload.fromListId}`);
        return isTarget;
      });

      toListCards.sort((a, b) => a.order - b.order);
      toListCards.splice(action.payload.index, 0, ...targetCards);
      toListCards.forEach((t, index) => {
        t.order = index + 1;
        t.listId = action.payload.toListId;
      });
      fromListCards.filter((t) => t.listId === action.payload.fromListId).forEach((t, index) => (t.order = index + 1));
    },
  },
});

export const {addCard, deleteCards, closeCards, openCards, moveCards} = cardsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectOpenCards = (cards: Card[]) => cards.filter((t) => !t.archived);
export const selectCards = (state: { cards: Card[] }) => state.cards;

export default cardsSlice.reducer;