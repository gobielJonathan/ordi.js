import { createContext, useContext } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children, data = {} }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
