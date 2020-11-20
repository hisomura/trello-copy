import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { RootState } from "./store";

export type List = {
  boardId: string;
  id: string;
  name: string;
};

const listsAdapter = createEntityAdapter<List>();

export const listsSlice = createSlice({
  name: "lists",
  initialState: listsAdapter.getInitialState(),
  reducers: {
    addList: (state, action: { payload: { boardId: string; name: string } }) => {
      const { boardId, name } = action.payload;
      listsAdapter.addOne(state, { boardId, id: uuidV4(), name });
    },
    removeList: listsAdapter.removeOne,
  },
});

export const listsActions = listsSlice.actions;

export const listsSelectors = listsAdapter.getSelectors<RootState>((state) => state.lists);

export default listsSlice.reducer;
