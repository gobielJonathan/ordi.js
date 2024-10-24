import type { SwcLoaderOptions } from "@rspack/core";
import ifDev from "../../../utils/ifDev";

export const clientLoader = [
  {
    test: /\.(j|t)s$/,
    exclude: [/[\\/]node_modules[\\/]/],
    loader: "builtin:swc-loader",
    type: "javascript/auto",
    options: {
      jsc: {
        parser: {
          syntax: "typescript",
        },
        transform: {
          react: {
            runtime: "automatic",
            development: ifDev(true, false),
            refresh: ifDev(true, false),
          },
        },
      },
    } satisfies SwcLoaderOptions,
  },
  {
    test: /\.(j|t)sx$/,
    loader: "builtin:swc-loader",
    type: "javascript/auto",
    exclude: [/[\\/]node_modules[\\/]/],
    options: {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
        },
        transform: {
          react: {
            runtime: "automatic",
            development: ifDev(true, false),
            refresh: ifDev(true, false),
          },
        },
      },
    } satisfies SwcLoaderOptions,
  },
];

export const serverLoader = [
  {
    test: /\.(j|t)s$/,
    exclude: [/[\\/]node_modules[\\/]/],
    loader: "builtin:swc-loader",
    type: "javascript/auto",
    options: {
      jsc: {
        externalHelpers: true,
        preserveAllComments: false,
        parser: {
          syntax: "typescript",
        },
        transform: {
          react: {
            runtime: "automatic",
            development: ifDev(true, false),
            throwIfNamespace: true,
            useBuiltins: false,
          },
        },
      },
    } satisfies SwcLoaderOptions,
  },
  {
    test: /\.(j|t)sx$/,
    loader: "builtin:swc-loader",
    type: "javascript/auto",
    exclude: [/[\\/]node_modules[\\/]/],
    options: {
      jsc: {
        externalHelpers: true,
        preserveAllComments: false,
        parser: {
          syntax: "typescript",
          tsx: true,
        },
        transform: {
          react: {
            runtime: "automatic",
            development: ifDev(true, false),
            throwIfNamespace: true,
            useBuiltins: false,
          },
        },
      },
    } satisfies SwcLoaderOptions,
  },
];
