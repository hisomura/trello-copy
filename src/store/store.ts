import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import cardsReducer from "./cardsSlice";
import listsReducer from "./listsSlice";
import selectionsReducer from "./selectionsSlice";
import boardsReducer from "./boardsSlice"

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  selections: selectionsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export default store;

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);
