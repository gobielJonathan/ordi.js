import { AppComponentType } from "ordijs/core";
import { Helmet } from "ordijs/head";
import { useHistory } from "ordijs/route";
import { useFetch } from "ordijs/fetch";

import styles from "./index.css";
import dummyPic from "./assets/dummy.jpg";

import Detail from "./components/Detail";

const Food: AppComponentType = () => {
  const history = useHistory();

  const { data: todos = [], loading } = useFetch({
    fetchKey: ["todos"],
    fetcher: () =>
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((arr) => arr.slice(1, 30)),
  });

  return (
    <>
      <Helmet>
        <title>food</title>
      </Helmet>

      <h3 className={styles.header}>Food</h3>
      <img src={dummyPic} alt="dummypic" />
      <Detail />
      <button onClick={() => history.push("/person")}>go to person</button>

      <ol>
        {loading && <h5>loading list...</h5>}
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </>
  );
};

export default Food;
