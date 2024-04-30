import { Button } from "antd";
import React from "react";
import ArticleList from "./ArticleList";
import styles from "./styles.module.scss";
import axios from "axios";

const ArticleManage = () => {
  const onFinish = (values: any) => {
    axios.get("/api/writing/generateText").then((res) => {});
  };
  return (
    <div className={styles.wrapper}>
      {/* <button onClick={onFinish}>123</button> */}
      <ArticleList />
    </div>
  );
};

export default ArticleManage;
