import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

import { canUseDom } from "../../../utils/dom";

type Props = {
  data: Record<string, unknown>;
};

type ContextValue = Record<string, unknown>;

export const DataContext = createContext<ContextValue | undefined>(undefined);

export const DataProvider = ({ children, data }: PropsWithChildren<Props>) => {
  const [initialData] = useState(() =>
    canUseDom ? window.__ORDI_DATA__ : data
  );

  return (
    <DataContext.Provider value={initialData}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined)
    throw Error("using useDataContext must under DataProvider");
  return context;
};
