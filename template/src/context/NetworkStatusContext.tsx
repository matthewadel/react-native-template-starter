import { NetworkStatus } from "models";
import React, { createContext, useReducer } from "react";

interface IState {
  isInternetReachable: NetworkStatus,
}

const initialState: IState = {
  isInternetReachable: -1,
}

const NetworkStatusStore = createContext({
  state: initialState,
  dispatch: (_: any) => { },
});

const { Provider } = NetworkStatusStore;

const NetworkStatusProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer((storeState: any, action: any) => {
    switch (action.type) {
      case "SET_NETOWORK_STATE":
        return { ...storeState, isInternetReachable: action.payload };
      default:
        return storeState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { NetworkStatusStore, NetworkStatusProvider };