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

    moveCards: (state, action: { payload: { ids: string[]; toListId: string; index: number } }) => {
      const markId = state.idsPerList[action.payload.toListId][action.payload.index];
      action.payload.ids.forEach((id) => {
        if (!(id in state.entities)) throw new Error(`Card: ${id} Not Found.`);

        const listId = state.entities[id].listId;
        state.entities[id].listId = action.payload.toListId;
        // fix saving order
        state.idsPerList[listId] = state.idsPerList[listId].filter((item) => item !== id);
      });

      const index =state.idsPerList[action.payload.toListId].findIndex((item) => item === markId);
      if (index !== -1) {
        state.idsPerList[action.payload.toListId].splice(index, 0, ...action.payload.ids)
      } else {
        state.idsPerList[action.payload.toListId] = [
          ...state.idsPerList[action.payload.toListId], ...action.payload.ids
        ]
      }
    },
  },
});

export const { addCard, archiveCards, moveCards } = cardsSlice.actions;

export default cardsSlice.reducer;