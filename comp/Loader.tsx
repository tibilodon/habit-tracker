import React from "react";
import styles from "../styles/load.module.scss";

const Loader: React.FC = () => {
  return (
    <>
      <div className={styles.loaderCenter}>
        <span className={styles.loader}></span>
      </div>
    </>
  );
};

export default Loader;
