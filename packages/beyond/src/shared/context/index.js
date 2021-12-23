import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./data/index";

const ContextProvider = ({ children, helmetContext, routerProps }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <DataProvider data={routerProps}>{children}</DataProvider>
    </HelmetProvider>
  );
};

export default ContextProvider;
