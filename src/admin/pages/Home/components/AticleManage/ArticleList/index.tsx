import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Image, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useSelector } from "react-redux";

interface data {
  content: string;
  title: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: string;
}

const saveLocalIndex = (index: number) => [
  window.localStorage.setItem("index", String(index)),
];

const ArticleList: React.FC = () => {
  const schema = useSelector((state: any) => {
    return state.homeManagement.schema;
  });
  //const lastCurrent = useRef(1);
  const [current, setCurrent] = useState(1);
  const onChange: PaginationProps["onChange"] = (page) => {
    saveLocalIndex(page);
    setCurrent(page);
  };
  useEffect(() => {
    setCurrent(parseInt(window.localStorage.getItem("index") || "1"));
  }, []);

  let list: [] | any = [];
  if (schema) {
    Array.from(new Set(list));
    for (let index = (current - 1) * 2 + 1; index <= current * 2; index++) {
      const item = schema[index - 1];
      list.push(
        item ? (
          <div key={index} className={styles?.item}>
            <div className={styles?.content}>
              <h3>{item?.title}</h3>
              <h4> {item?.message}</h4>
              {item?.content}
            </div>
            {item?.imgSrc && !item?.imgSrc.includes("undefined") ? (
              <div className={styles?.imgBox}>
                <Image
                  src={item?.imgSrc}
                  width={300}
                  height={180}
                  alt="抱歉，获取不到对应图片"
                  fallback=""
                ></Image>
              </div>
            ) : null}
            <div className={styles.rightArea}>
              <div className={styles.contactPerson}>
                <p style={{ fontSize: 16, color: "#999" }}>相关成员：</p>
                {item?.people &&
                  JSON.parse(item?.people).map((pe: string, index: number) => {
                    return (
                      <div key={index} style={{ color: "red" }}>
                        {pe}
                      </div>
                    );
                  })}
              </div>
              <div className={styles.goEdit}>
                <Link to={`/OnEdit`} state={item}>
                  <Button
                    type={"primary"}
                    style={{ height: "100%", fontSize: 15 }}
                  >
                    去编辑
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null
      );
    }
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrapper}>
        <Card
          title="智能技术与工程学院党支部"
          bordered={false}
          style={{ width: 1100 }}
        >
          {list}
        </Card>
      </div>
      <div className={styles.bottom}>
        <Pagination
          current={current}
          onChange={onChange}
          total={schema.length}
          pageSize={2}
        />
      </div>
    </div>
  );
};

export default ArticleList;
