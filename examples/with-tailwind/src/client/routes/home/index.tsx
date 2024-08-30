import { AppComponentType } from "ordijs/core";

import Examples from "./components/Examples";

import "./index.css";

const Home: AppComponentType = () => {
  return (
    <div className="container">
      <h1 className="headline text-ellipsis">
        Welcome to
        <a className="link" href="https://ordijs.vercel.app/">
          Ordi.js
        </a>
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        <span>Get started by editing</span>{" "}
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
        <Examples />
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

export default Home;
