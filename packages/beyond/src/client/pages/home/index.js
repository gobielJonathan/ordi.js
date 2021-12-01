import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { styButton } from "./style";
import style from "./index.css";

export default function Home({ data = [] }) {
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>home</title>
      </Helmet>
      <h1 className={style.title}>testing from home</h1>
      {data?.map((d, idx) => (
        <p key={idx}>{d}</p>
      ))}
      <button className={styButton} onClick={() => history.push("/person")}>
        redirect to person
      </button>
    </>
  );
}

Home.getStaticProps = async (ctx) => {
  const data = await Promise.resolve([
    Math.random(),
    Math.random(),
    Math.random(),
  ]);
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
