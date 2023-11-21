import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { Image, Card } from "antd";
import { LeftSquareOutlined } from "@ant-design/icons";
import banner1 from "../../../../static/img/banner1.jpg";
import { stat } from "fs";

interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
}

const goBack = () => {
  window.history.go(-1);
};
const Detail: React.FC = (props) => {
  // content, title, imgSrc, academy, message, people
  const { state } = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.topIcon} onClick={goBack}>
        <LeftSquareOutlined />
      </div>
      {state.imgSrc.includes("undefined") ? (
        <div className={styles.bkImg}>
          <img src={banner1}></img>
        </div>
      ) : (
        <div className={styles.bkImg}>
          <img src={state.imgSrc}></img>
        </div>
      )}

      <div className={styles.main}>
        <h2>{state.title}</h2>

        {state.imgSrc.includes("undefined") ? (
          <div className={styles.imgBox}>
            <Image
              src={banner1}
              width={500}
              height={280}
              alt="抱歉，获取不到对应图片"
            ></Image>
          </div>
        ) : (
          <div className={styles.imgBox}>
            <Image
              src={state?.imgSrc}
              width={400}
              height={280}
              alt="抱歉，获取不到对应图片"
            ></Image>
          </div>
        )}

        <div className={styles.content}>{state.content}</div>
        <div className={styles.message}>
          {state.message} 相关成员：
          {JSON.parse(state.people).map((pe: string, index: number) => {
            return <span style={{ color: "red", marginRight: 5 }}>{pe}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
