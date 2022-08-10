import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ops! Nothing happened here.</h1>
    </div>
  );
};

export default NotFoundBlock;
