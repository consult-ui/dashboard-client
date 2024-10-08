import layoutSlice from './slices/layoutSlice.ts';
import chatApi from '@/app/api/api-list/chat.ts';
import etcApi from '@/app/api/api-list/etc.ts';
import organizationsApi from '@/app/api/api-list/organizations.ts';
import userApi from '@/app/api/api-list/user.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  //slices
  layout: layoutSlice,
  //api
  [userApi.reducerPath]: userApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [etcApi.reducerPath]: etcApi.reducer,
});

const persistConfig = {
  key: 'consult-ai-persist',
  whitelist: ['layout'],
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, organizationsApi.middleware, chatApi.middleware, etcApi.middleware),
});

export const persistedStore = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
