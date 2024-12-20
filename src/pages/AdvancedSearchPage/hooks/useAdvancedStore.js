import { createContext, useContext, useReducer } from "react";
import { initState, reducer } from "../components/AdvancedStore";

const AdvancedStoreContext = createContext(initState);

export const AdvancedStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AdvancedStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AdvancedStoreContext.Provider>
  );
};

export const useAdvancedStore = () => {
  const { state, dispatch } = useContext(AdvancedStoreContext);

  return { state, dispatch };
};
