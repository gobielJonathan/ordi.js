import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import type { HelmetData } from "react-helmet-async";
import type { ChunkExtractor } from "@loadable/server";

export type HtmlContextType = {
  helmet: HelmetData["context"]["helmet"];
  extractor: ChunkExtractor;
  html: string;
  routerProps: Record<string, unknown>;
  fetchProps: Record<string, unknown>;
};

export const HtmlContext = createContext<HtmlContextType | undefined>(
  undefined
);

export const HtmlProvider= (
  props: PropsWithChildren<HtmlContextType>
) => {
  const { helmet, extractor, html, routerProps, children, fetchProps } = props;

  return (
    <HtmlContext.Provider
      value={{ helmet: helmet, extractor, html, routerProps, fetchProps }}
    >
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
