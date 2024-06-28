import { Helmet } from "ordijs/head";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

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
