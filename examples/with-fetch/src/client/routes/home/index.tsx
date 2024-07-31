import { AppComponentType } from "ordijs/core";
import { useFetch } from "ordijs/fetch";

import "./index.css";

const Person: AppComponentType = () => {
  const { data: todos } = useFetch({
    fetchKey: ["todos"],
    fetcher: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    initialData: [],
  });

  return (
    <div className="container">
      <h1 className="headline">
        Welcome to{" "}
        <a className="link" href="https://ordijs.vercel.app/">
          Ordi.js!
        </a>
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        Get started by editing{" "}
        <code>
          <b>routes/home/index.tsx</b>
        </code>
      </p>

      <div className="content">
        <a target="_blank" href="https://ordijs.vercel.app/">
          <div className="card">
            <h5>Documentation</h5>
            <p>Find in-depth information about Ordi.js features and API.</p>
          </div>
        </a>
        <a
          target="_blank"
          href="https://github.com/gobielJonathan/ordi.js/tree/main/examples"
        >
          <div className="card">
            <h5>Examples</h5>
            <p>Discover and deploy boilerplate example Ordi.js projects.</p>
          </div>
        </a>
        <a target="_blank" href="https://vercel.com/">
          <div className="card">
            <h5>Deploy</h5>
            <p>
              Instantly deploy your Ordi.js site to a public URL with Vercel.
            </p>
          </div>
        </a>
      </div>

      <h1>Todos</h1>

      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default Person;
