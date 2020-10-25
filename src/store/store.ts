import { configureStore ,getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import cardsReducer from "./cardsSlice";
import listsReducer from "./listsSlice";

const persistConfig = {
  key: 'root',
  storage
}

export const rootReducer = combineReducers({
  cards: cardsReducer,
  lists: listsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
export default store

export const persistor = persistStore(store)