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
    selectTasks(state, action: { payload: { taskIds: string[] } }) {
      const idsSet = new Set([...state.selectedTaskIds, ...action.payload.taskIds]);
      state.selectedTaskIds = Array.from(idsSet);
    },
    unselectTasks(state, action: { payload: { taskIds: string[] } }) {
      state.selectedTaskIds = state.selectedTaskIds.filter(
        (selectedTaskId) => !action.payload.taskIds.includes(selectedTaskId)
      );
    },
    unselectAllTasks(state, _action) {
      state.selectedTaskIds = [];
    },
  },
});

export const { selectTasks, unselectTasks, unselectAllTasks } = multiTaskDragSlice.actions;

export default multiTaskDragSlice.reducer;
