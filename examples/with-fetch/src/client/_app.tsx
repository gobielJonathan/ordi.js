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
      </Helmet>
      {children}
    </>
  );
}
