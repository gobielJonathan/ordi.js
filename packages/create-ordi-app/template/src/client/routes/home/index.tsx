import { AppComponentType } from "ordijs/core";
import "./index.css";
import testStyles from "./test.module.css";

const Person: AppComponentType = () => {
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
        <code className={testStyles.test}>
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
    </div>
  );
};

export default Person;
