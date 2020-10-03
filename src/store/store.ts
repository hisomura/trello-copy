import {configureStore} from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import listsReducer from "./listsSlice";

export default configureStore({
  reducer: {
    cards: cardsReducer,
    lists: listsReducer,
  },
});