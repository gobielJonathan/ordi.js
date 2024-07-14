interface Window {
  __ORDI_DATA__: Record<string, unknown>;
  __ORDI_FETCH__: Record<string, unknown>;
}

interface NodeModule {
  hot: {
    accept: (path?: string | string[], callback?: () => void) => void;
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT_SERVER: number;
    }
  }
}

declare const __DEV__: boolean;
declare const __PROD__: boolean;
