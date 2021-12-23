import { createContext, useContext } from "react";

export const HtmlContext = createContext({
  helmet: {},
  extractor: {},
  html: "",
});

export const HtmlProvider = ({
  children,
  helmet,
  extractor,
  html,
  routerProps,
}) => {
  return (
    <HtmlContext.Provider value={{ helmet, extractor, html, routerProps }}>
      {children}
    </HtmlContext.Provider>
  );
};

export const useHtmlContext = () => {
  return useContext(HtmlContext);
};
