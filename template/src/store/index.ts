import AppReducer from './AppReducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import { persistStore, persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage'

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  blacklist: []
};

const rootReducer = combineReducers({
  App: AppReducer,
  User: UserReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export { store }
export const persistor = persistStore(store);
export * from './AppReducer'
export * from './UserReducer'