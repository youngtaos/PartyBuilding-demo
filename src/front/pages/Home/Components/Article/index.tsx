import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Image, Card } from "antd";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface data {
  content: string;
  title: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: string;
}
const Article: React.FC<{
  schema: data[];
}> = (props) => {
  const schema = props?.schema;
  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    //console.log("page", page);
    setCurrent(page);
  };
  let list: [] | any = [];
  if (schema) {
    Array.from(new Set(list));
    for (let index = (current - 1) * 3 + 1; index <= current * 3; index++) {
      const item = schema[index - 1];
      list.push(
        <div key={index} className={styles?.item}>
          <Link to={`/detail`} state={item}>
            <div className={styles?.content}>
              <h3>{item?.title}</h3>
              <h4> {item?.message}</h4>
              {item?.content}
            </div>
          </Link>
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
        </div>
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
          pageSize={3}
        />
      </div>
    </div>
  );
};

export default Article;
