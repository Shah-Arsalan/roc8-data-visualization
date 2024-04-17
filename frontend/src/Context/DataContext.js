
import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { DataReducer, initialState } from "../Reducer/DataReducer";

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
