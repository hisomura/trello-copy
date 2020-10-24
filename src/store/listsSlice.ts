import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

export type List = {
  boardId: string;
  id: string;
  name: string;
  archived: boolean;
  order: number;
};

export const listsSlice = createSlice({
  name: "lists",
  initialState: [
    {
      boardId: "default-board",
      id: "default-list",
      name: "default list",
      archived: false,
      order: 1,
    },
  ] as List[],
  reducers: {
    addList: (lists, action: { payload: { boardId: string; name: string } }) => {
      lists.push({
        boardId: action.payload.boardId,
        id: uuidV4(),
        name: action.payload.name,
        archived: false,
        order: lists.filter((t) => t.boardId === action.payload.boardId).length + 1,
      });
    },
    deleteLists: (lists, action: { payload: { ids: string[] } }) => {
      return lists.filter((t) => !action.payload.ids.includes(t.id));
    },
    archiveLists: (lists, action: { payload: { ids: string[] } }) => {
      return lists.map((t) => (action.payload.ids.includes(t.id) ? { ...t, archived: true } : t));
    },
    unArchiveLists: (lists, action: { payload: { ids: string[] } }) => {
      return lists.map((t) => (action.payload.ids.includes(t.id) ? { ...t, archived: false } : t));
    },
  },
});

export const { addList, deleteLists, archiveLists, unArchiveLists } = listsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectOpenLists = (lists: List[]) => lists.filter((t) => !t.archived);
export const selectLists = (state: { lists: List[] }) => state.lists;

export default listsSlice.reducer;