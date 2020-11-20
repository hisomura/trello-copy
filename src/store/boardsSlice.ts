import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { RootState } from "./store";

export type Board = {
  id: string;
  name: string;
};

const boardsAdapter = createEntityAdapter<Board>();

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState(),
  reducers: {
    addBoard: (state, action: { payload: { name: string } }) => {
      boardsAdapter.addOne(state, { id: uuidV4(), name: action.payload.name });
    },
  },
});

export const boardsActions = boardsSlice.actions;

export const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);

export default boardsSlice.reducer;
