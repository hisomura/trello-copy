import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import cardsReducer from "./cardsSlice";
import listsReducer from "./listsSlice";
import selectionsReducer from "./selectionsSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  cards: cardsReducer,
  lists: listsReducer,
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

export const persistor = persistStore(store);
