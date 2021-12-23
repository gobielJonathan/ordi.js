import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./data";

export const ContextProvider = ({ helmetContext, routerProps }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <DataProvider data={routerProps}></DataProvider>
    </HelmetProvider>
  );
};
