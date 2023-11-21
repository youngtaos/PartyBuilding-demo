import { Button } from "antd";
import React from "react";
import ArticleList from "./ArticleList";
import MyEditor from "./Editor";
import styles from "./styles.module.scss";

const ArticleManage = () => {
  return (
    <div className={styles.wrapper}>
      <ArticleList />
    </div>
  );
};

export default ArticleManage;
