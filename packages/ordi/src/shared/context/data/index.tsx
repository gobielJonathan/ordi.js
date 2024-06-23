import { canUseDom } from "../../../utils/dom";
import { createContext, useContext } from "react";
import type { ReactNode, VFC } from "react";

type Props = {
  data: Record<string, unknown>;
};

type ContextValue = Record<string, unknown>

export const DataContext = createContext<ContextValue| undefined>(undefined);

export const DataProvider: VFC<Props & { children: ReactNode }> = ({
  children,
  data,
}) => {
  const initialData = canUseDom ? window.__BEYOND__DATA__ : data;

  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined)
    throw Error("using useDataContext must under DataProvider");
  return context;
};
