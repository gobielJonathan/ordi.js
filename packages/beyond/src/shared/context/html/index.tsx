import { createContext, useContext } from "react";
import type { VFC, ReactNode } from "react";
import type { HelmetData } from "react-helmet-async";
import type { ChunkExtractor } from "@loadable/server";

export type HtmlContextType = {
  helmet: HelmetData;
  extractor: ChunkExtractor;
  html: string;
  routerProps: Record<string, unknown>;
};

export const HtmlContext = createContext<HtmlContextType | undefined>(
  undefined
);

export const HtmlProvider: VFC<HtmlContextType & { children: ReactNode }> = (
  props
) => {
  const { helmet, extractor, html, routerProps, children } = props;
  return (
    <HtmlContext.Provider value={{ helmet, extractor, html, routerProps }}>
      {children}
    </HtmlContext.Provider>
  );
};

export const useHtmlContext = () => {
  const context = useContext(HtmlContext);
  if (context === undefined)
    throw Error("using useHtmlContext must under HtmlProvider");
  return context;
};
