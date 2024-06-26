interface Window {
  __ORDI_DATA__: Record<string, unknown>;
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
