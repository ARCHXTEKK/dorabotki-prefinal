import { createContext, useContext, useReducer } from "react";
import { initState, reducer } from "../store";

const StoreContext = createContext(initState);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (store) => {
  const { state, dispatch } = useContext(StoreContext);

  return { state, dispatch };
};
