import { canUseDom } from "@beyond/utils/dom";
import { createContext, useContext } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children, data = {} }) => {
  const initialData = canUseDom() ? window.__BEYOND__DATA__ : data;

  return (
    <DataContext.Provider value={initialData}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
