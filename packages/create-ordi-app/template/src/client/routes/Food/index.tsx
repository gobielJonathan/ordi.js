import { useState } from "react";
import { AppComponentType } from "ordi/core";
import { useDataContext } from "ordi/data";
import { Helmet } from "ordi/head";

import lazy from "ordi/lazy";
import styles from "./index.css";
import dummyPic from "./assets/dummy.jpg";

const Detail = lazy(
  () => import(/* webpackChunkName: "detail" */ "./components/Detail"),
  { ssr: true }
);

const Food: AppComponentType = () => {
  const [showDetail, setShowDetail] = useState(false);

  const data = useDataContext() as unknown as {
    todos: {
      title: string;
      id: number;
    }[];
  };

  const toggleShowDetail = () => {
    setShowDetail((e) => !e);
  };

  return (
    <>
      <Helmet>
        <title>food</title>
      </Helmet>
      <div>
        <h3 className={styles.header}>Food</h3>
        <img src={dummyPic} alt="dummypic" />
        <ul>
          {data.todos?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        {showDetail && <Detail />}
        <Detail />
        <button onClick={toggleShowDetail}>toggle show detai</button>
      </div>
    </>
  );
};

Food.getServerSideProps = async () => {
  // const todos = await fetch("https://jsonplaceholder.typicode.com/todos").then(
  //   (res) => res.json()
  // );

  return {
    props: {
      todos: [],
    },
  };
};

export default Food;
