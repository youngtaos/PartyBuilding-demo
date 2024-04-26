import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Image, Card, Button, Input } from "antd";
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
  const mySchema = useSelector((state: any) => {
    return state.homeManagement.schema;
  });
  const [schema, setSchema] = useState(mySchema);
  const [current, setCurrent] = useState(1);
  const [keyWords, setKeyWords] = useState("");
  const onChange: PaginationProps["onChange"] = (page) => {
    saveLocalIndex(page);
    setCurrent(page);
  };
  useEffect(() => {
    setCurrent(parseInt(window.localStorage.getItem("index") || "1"));
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setKeyWords(e.currentTarget.value);
  };
  let list: [] | any = [];
  useEffect(() => {
    const filterAns = mySchema.filter(
      (item: any) =>
        JSON.parse(item.people).filter((item: string) => {
          console.log(item.includes(keyWords), "item", item);
          return !!item.includes(keyWords);
        }).length !== 0
    );
    setSchema(filterAns);
  }, [keyWords, mySchema]);
  if (schema) {
    Array.from(new Set(list));
    for (let index = (current - 1) * 2 + 1; index <= current * 2; index++) {
      const item = schema[index - 1];
      list.push(
        item ? (
          <div key={index} className={styles?.item}>
            <Link to={`/OnEdit`} state={item}>
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
        ) : null
      );
    }
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.searchInputBox}>
        <Input
          placeholder="通过名字筛选…"
          className={styles.searchInput}
          onPressEnter={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      <div className={styles.ContentWrapper}>
        <Card bordered={false} style={{ width: 1100 }}>
          {list}
        </Card>
      </div>
      <div className={styles.bottom}>
        <Pagination
          current={current}
          onChange={onChange}
          total={schema.length}
          pageSize={2}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ArticleList;
