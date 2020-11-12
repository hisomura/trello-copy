import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export type SelectionState = {
  selectedCardIds: string[];
};

export const selectionsSlice = createSlice<SelectionState, SliceCaseReducers<SelectionState>>({
  name: "selections",
  initialState: {
    selectedCardIds: [],
  },
  reducers: {
    selectCards(state, action: { payload: { taskIds: string[] } }) {
      const idsSet = new Set([...state.selectedCardIds, ...action.payload.taskIds]);
      state.selectedCardIds = Array.from(idsSet);
    },
    unselectCards(state, action: { payload: { taskIds: string[] } }) {
      state.selectedCardIds = state.selectedCardIds.filter(
        (selectedCardId) => !action.payload.taskIds.includes(selectedCardId)
      );
    },
    unselectAllCards(state, _action) {
      state.selectedCardIds = [];
    },
    toggleCardSelection(state, action: { payload: { taskId: string } }) {
      const index = state.selectedCardIds.findIndex((id) => id === action.payload.taskId);
      if (index === -1) {
        state.selectedCardIds.push(action.payload.taskId);
      } else {
        state.selectedCardIds.splice(index, 1);
      }
    },
  },
});

export const { selectCards, unselectCards, unselectAllCards, toggleCardSelection } = selectionsSlice.actions;

export default selectionsSlice.reducer;
