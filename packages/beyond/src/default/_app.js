import { Helmet } from "react-helmet-async";

export default function App({ children }) {
  return (
    <>
      <Helmet>
        <html lang="id" />
        <title>Welcome to beyond framework</title>
      </Helmet>
      {children}
    </>
  );
}
