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
    archiveCards: (state, action: { payload: { ids: string[] } }) => {
      action.payload.ids.forEach((id) => {
        const listId = state.entities[id].listId;
        state.entities[id].archived = true;
        state.archivedIds.push(id);
        const index = state.idsPerList[listId].findIndex((i) => i === id);
        state.idsPerList[listId].splice(index, 1);
      });
    },
  },
});

export const { addCard, archiveCards } = cardsSlice.actions;

export default cardsSlice.reducer;