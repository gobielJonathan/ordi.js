import { useState } from "react";
import { AppComponentType } from "ordijs/core";
import { useDataContext } from "ordijs/data";
import { Helmet } from "ordijs/head";
import { useHistory } from "ordijs/route";
import lazy from "ordijs/lazy";

import styles from "./index.css";
import dummyPic from "./assets/dummy.jpg";

const Detail = lazy(
  () => import(/* webpackChunkName: "detail" */ "./components/Detail"),
  {
    ssr: true,
  }
);

const Food: AppComponentType = () => {
  const history = useHistory();
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

      <h3 className={styles.header}>Food</h3>
      <img src={dummyPic} alt="dummypic" />
      {showDetail && <Detail />}
      <Detail />
      <button onClick={toggleShowDetail}>toggle show detail</button>
      <button onClick={() => history.push("/person")}>go to person</button>

      <ul>
        {data.todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Food;
