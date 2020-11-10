import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

type State = {
  selectedTaskIds: string[];
};

export const selectionsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "selections",
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

export const { selectTasks, unselectTasks, unselectAllTasks } = selectionsSlice.actions;

export default selectionsSlice.reducer;
