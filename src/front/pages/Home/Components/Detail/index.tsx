import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { Image, Card, Space, Popover, QRCode } from "antd";
import {
  FilePdfOutlined,
  LeftSquareOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import banner1 from "../../../../static/img/banner1.jpg";
import { stat } from "fs";
import HighlightKeywords from "./HighlightKeywords";

interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
}

const Detail: React.FC = (props) => {
  // content, title, imgSrc, academy, message, people
  const { state } = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.title}>{state.title}</div>
        <div className={styles.info}>
          <div>重庆科技大学智能技术与工程学院教工第一党支部</div>
          <Space>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.print();
              }}
            >
              <Popover
                overlayInnerStyle={{ padding: 0 }}
                content={<QRCode value="https://ant.design" bordered={false} />}
              >
                <Space style={{ cursor: "pointer" }}>
                  <FilePdfOutlined />
                  打印
                </Space>
              </Popover>
            </div>
            <div style={{ cursor: "pointer" }}>
              <ShareAltOutlined />
              分享
            </div>
          </Space>
        </div>
        <div className={styles.content}>
          <HighlightKeywords
            text={state.content}
            keywords={JSON.parse(state.people)}
          />
        </div>
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
        <div className={styles.message}>
          <div>{state.message} </div>
          <div>
            相关成员：
            {JSON.parse(state.people).map((pe: string, index: number) => {
              return <span style={{ color: "red", marginRight: 5 }}>{pe}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
