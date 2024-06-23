import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

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
