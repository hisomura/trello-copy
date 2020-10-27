import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

export type Card = {
  id: string;
  listId: string;
  name: string;
  archived: boolean;
};

export type State = {
  entities: { [key: string]: Card };
  archivedIds: string[];
  idsPerList: {
    [key: string]: string[];
  };
};

export const cardsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "cards",
  initialState: {
    idsPerList: {},
    archivedIds: [],
    entities: {},
  },
  reducers: {
    addCard: (state, action: { payload: { listId: string; name: string } }) => {
      const id = uuidV4();
      state.idsPerList[action.payload.listId].push(id);
      state.entities[id] = {
        id: uuidV4(),
        listId: action.payload.listId,
        name: action.payload.name,
        archived: false,
      };
    },
  },
});

export const { addCard, deleteCards, closeCards, openCards, moveCards } = cardsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectOpenCards = (cards: Card[]) => cards.filter((t) => !t.archived);
export const selectCards = (state: { cards: Card[] }) => state.cards;

export default cardsSlice.reducer;