import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Image, Card, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import qs from "qs";

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
  const [schema, setSchema] = useState([]);
  const [current, setCurrent] = useState(1);
  const [keyWords, setKeyWords] = useState("");
  const onChange: PaginationProps["onChange"] = (page) => {
    saveLocalIndex(page);
    setCurrent(page);
  };
  const [modal, contextHolder] = Modal.useModal();
  const handleGetHistoryArticleList = () => {
    axios.get("/api/article/getArticleList").then((res) => {
      console.log(res.data.data, "res");
      setSchema(res.data.data);
    });
  };
  useEffect(() => {
    handleGetHistoryArticleList();
    setCurrent(parseInt(window.localStorage.getItem("index") || "1"));
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setKeyWords(e.currentTarget.value);
  };
  const confirm = (id: number) => {
    modal.confirm({
      title: "注意",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除你的这篇文章吗",
      okText: (
        <div
          onClick={() => {
            axios
              .post(
                "/api/article/DeleteArticleById",
                qs.stringify({
                  id,
                }),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then(() => {
                handleGetHistoryArticleList();
              });
          }}
        >
          确认
        </div>
      ),
      cancelText: "取消",
    });
  };
  function removeTags(html: any) {
    return html.replace(/<[^>]+>/g, ""); // 匹配任意标签并替换为空字符串
  }
  let list: [] | any = [];
  if (schema) {
    Array.from(new Set(list));
    for (let index = 0; index <= Array.from(new Set(list)).length; index++) {
      const item: any = schema[index - 1];
      console.log(item, "item");
      item &&
        list.push(
          <Link to={`/OnEdit`} state={item}>
            <div className={styles?.content}>{removeTags(item.content)}</div>
          </Link>
        );
    }
  }

  return (
    <div className={styles.Wrapper}>
      {/* <div className={styles.searchInputBox}>
        <Input
          placeholder="通过名字筛选…"
          className={styles.searchInput}
          onPressEnter={(e) => {
            handleSearch(e);
          }}
        />
      </div> */}
      {contextHolder}
      <div className={styles.ContentWrapper}>
        <Card
          bordered={false}
          style={{
            width: 1100,
          }}
        >
          {schema.map((item: any, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#333",
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                    padding: "20px",
                    boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.1)",
                    margin: "5px",
                  }}
                >
                  <Link to={`/OnEdit2`} state={item}>
                    <div className={styles?.content}>
                      {removeTags(item.content)}
                    </div>
                  </Link>

                  <div
                    style={{
                      color: "#969696",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>最近修改时间：{item.createTime}</div>
                    <Button
                      type={"text"}
                      style={{ color: "red" }}
                      onClick={() => {
                        confirm(item.id);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      {/* <div className={styles.bottom}>
        <Pagination
          current={current}
          onChange={onChange}
          total={schema.length}
          pageSize={2}
          showSizeChanger={false}
        />
      </div> */}
    </div>
  );
};

export default ArticleList;
