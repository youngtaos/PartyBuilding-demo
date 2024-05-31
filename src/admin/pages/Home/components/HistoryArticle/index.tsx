import { Button } from "antd";
import React, { useEffect, useRef } from "react";
import ArticleList from "./ArticleList";
import styles from "./styles.module.scss";
import axios from "axios";
import MyModalMenu from "./Editor/chatMenu";
import { Boot } from "@wangeditor/editor";

const HistoryArticle = () => {
  const onFinish = (values: any) => {
    axios.get("/api/writing/generateText").then((res) => {});
  };
  function useEffectBeforeMount(effect: any, deps: any) {
    const mounted = useRef(false);

    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      return effect();
    }, deps);
  }
  // useEffectBeforeMount(() => {
  //   const menu1Conf = {
  //     key: "chat", // 定义 menu key ：要保证唯一、不重复（重要）
  //     factory() {
  //       return new MyModalMenu(); // 把 `YourMenuClass` 替换为你菜单的 class
  //     },
  //   };
  //   Boot.registerMenu(menu1Conf);
  // }, []);
  return (
    <div className={styles.wrapper}>
      {/* <button onClick={onFinish}>123</button> */}
      <ArticleList />
    </div>
  );
};

export default HistoryArticle;
