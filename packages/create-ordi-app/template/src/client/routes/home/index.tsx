import { AppComponentType } from "ordijs/core";
import styles from "./index.css";

const Person: AppComponentType = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>
        Welcome to{" "}
        <a className={styles.link} href="https://ordijs.vercel.app/">
          Ordi.js!
        </a>
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        Get started by editing{" "}
        <code>
          <b>routes/home/index.tsx</b>
        </code>
      </p>

      <div className={styles.content}>
        <a target="_blank" href="https://ordijs.vercel.app/">
          <div className={styles.card}>
            <h5>Documentation</h5>
            <p>Find in-depth information about Ordi.js features and API.</p>
          </div>
        </a>
        <a
          target="_blank"
          href="https://github.com/gobielJonathan/ordi.js/tree/main/examples"
        >
          <div className={styles.card}>
            <h5>Examples</h5>
            <p>Discover and deploy boilerplate example Ordi.js projects.</p>
          </div>
        </a>
        <a target="_blank" href="https://vercel.com/">
          <div className={styles.card}>
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
