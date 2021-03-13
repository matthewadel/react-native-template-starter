import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import reducers from "./Reducers";
import ReduxThunk from "redux-thunk"

const migrations = {
  0: (state) => {
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
  storage: AsyncStorage,
  migrate: createMigrate(migrations, { debug: false }),
}

const finalReducer = persistReducer(persistConfig, reducers)
export const store = createStore(finalReducer, {}, compose(applyMiddleware(ReduxThunk)))
export const persistor = persistStore(store)
