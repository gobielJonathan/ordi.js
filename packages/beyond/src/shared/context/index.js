import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./data";

export const ContextProvider = ({ children, helmetContext, routerProps }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <DataProvider data={routerProps}>{children}</DataProvider>
    </HelmetProvider>
  );
};
