import React from "react";
import styles from "./styles.module.scss";
import { Empty } from "antd";
const Blank = () => {
  return (
    <div className={styles.Wrapper}>
      <p>请爬取最新的数据哦</p>
      <Empty />
    </div>
  );
};

export default Blank;
