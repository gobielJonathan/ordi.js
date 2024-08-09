import { Helmet } from "ordijs/head";
import { ReactNode } from "react";

import "./_app.css";

interface Props {
  children: ReactNode;
}

export default function App({ children }: Props) {
  return (
    <>
      <Helmet>
        <html lang="id" />
        <title>Welcome to ordi framework</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      {children}
    </>
  );
}
