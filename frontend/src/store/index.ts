// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';

// Create persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// Combine reducers (in case you add more in future)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// 🐞 Debug current Redux state
store.subscribe(() => {
  console.log('[Redux State]', store.getState());
});
// Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
