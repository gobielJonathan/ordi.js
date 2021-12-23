import { createContext, useContext } from "react";

export const HtmlContext = createContext({
  helmet: {},
  extractor: {},
  html: "",
});

export const HtmlProvider = ({ children, helmet, extractor, html }) => {
  return (
    <HtmlContext.Provider value={{ helmet, extractor, html }}>
      {children}
    </HtmlContext.Provider>
  );
};

export const useHtmlContext = () => {
  return useContext(HtmlContext);
};
