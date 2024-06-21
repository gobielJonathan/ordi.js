import { canUseDom } from "../../../utils/dom";
import { createContext, useContext } from "react";
import type { ReactNode, VFC } from "react";

type Props = {
  data: Record<string, unknown>;
};

export const DataContext = createContext<Props | undefined>(undefined);

export const DataProvider: VFC<Props & { children: ReactNode }> = ({
  children,
  data,
}) => {
  const initialData = canUseDom ? window.__BEYOND__DATA__ : data;

  return (
    <DataContext.Provider value={{ data: initialData }}>
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
