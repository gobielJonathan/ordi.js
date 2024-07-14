import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

import type { CollectorValue } from "../../../server/utils/collector";
import { canUseDom } from "../../../utils/dom";

export type { CollectorValue } from "../../../server/utils/collector";

type Props = {
  collector?: CollectorValue;
};

type ContextValue = {
  collector?: CollectorValue;
  data: Record<string, unknown>;
};

export const FetchContext = createContext<ContextValue | undefined>(undefined);

export const FetchProvider = ({
  children,
  collector,
}: PropsWithChildren<Props>) => {
  const [data] = useState(() => {
    if (canUseDom) return window.__ORDI_FETCH__;
    // in SSR
    return collector?.getResolved() || {};
  });

  return (
    <FetchContext.Provider value={{ collector, data }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw Error("using useFetchContext must under FetchProvider");
  }

  return context;
};
