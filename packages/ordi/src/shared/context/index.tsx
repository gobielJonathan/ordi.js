import type { ReactNode, VFC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./data";

type Props = {
  children: ReactNode;
  helmetContext?: Record<string, unknown>;
  routerProps?: Record<string, unknown>;
};

const ContextProvider: VFC<Props> = ({
  children,
  helmetContext = {},
  routerProps = {},
}) => {
  return (
    <HelmetProvider context={helmetContext}>
      <DataProvider data={routerProps}>{children}</DataProvider>
    </HelmetProvider>
  );
};

export default ContextProvider;
