import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'
import FilesystemStorage from 'redux-persist-filesystem-storage'
import reducers from "./Reducers";
import ReduxThunk from "redux-thunk"
import { IRootState } from 'models';

const migrations: any = {
  0: (state: IRootState) => {
    return state
  },
  // 1: (state) => {
  //   return {
  //     ...state,
  //     User: {
  //       ...state.User,
  //       max_5: 'max_5'
  //     }
  //   }
  // },
}

const persistConfig = {
  key: 'primary',
  version: 0,
  storage: FilesystemStorage,
  migrate: createMigrate(migrations, { debug: false }),
}

const finalReducer = persistReducer(persistConfig, reducers)
export const store = createStore(finalReducer, {}, compose(applyMiddleware(ReduxThunk)))
export const persistor = persistStore(store)
