import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import truckingRecordsReducer from './truckingRecordSlice'; // ✅ import your new slice

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Create persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // 🔒 Only persist auth for now
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  truckingRecords: truckingRecordsReducer, // ✅ add your trucking slice here
});

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Optional: Debug Redux state
store.subscribe(() => {
  console.log('[Redux State]', store.getState());
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
