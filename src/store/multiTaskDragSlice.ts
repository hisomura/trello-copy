import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export type MultiTaskDragState = {
  selectedTaskIds: string[];
};

export const multiTaskDragSlice = createSlice<MultiTaskDragState, SliceCaseReducers<MultiTaskDragState>>({
  name: "lists",
  initialState: {
    selectedTaskIds: [],
  },
  reducers: {
    addTaskIds(state, action: { payload: { taskIds: string[] } }) {
      const idsSet = new Set([...state.selectedTaskIds, ...action.payload.taskIds]);
      state.selectedTaskIds = Array.from(idsSet);
    },
    deleteTaskIds(state, action: { payload: { taskIds: string[] } }) {
      state.selectedTaskIds = state.selectedTaskIds.filter(
        (selectedTaskId) => !action.payload.taskIds.includes(selectedTaskId)
      );
    },
    clearTaskIds(state, _action) {
      state.selectedTaskIds = [];
    },
  },
});

export const { addTaskIds, deleteTaskIds, clearTaskIds } = multiTaskDragSlice.actions;

export default multiTaskDragSlice.reducer;
