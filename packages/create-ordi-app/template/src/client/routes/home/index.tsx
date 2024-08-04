import { AppComponentType } from "ordijs/core";
import loadable from "ordijs/lazy";

import "./index.css";
import testStyles from "./test.module.css";
import downloadPng from "./assets/download.png";

const Examples = loadable(
  () => import(/* webpackChunkName: "examples" */ "./components/Examples")
);

const Home: AppComponentType = () => {
  return (
    <div className="container">
      <h1 className="headline">
        Welcome to
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

      <img src={downloadPng} alt="" style={{ width: "100%" }} />
      <p>{process.env.ORDI_PUBLIC_ASSET_PREFIX}</p>
    </div>
  );
};

export default Home;
