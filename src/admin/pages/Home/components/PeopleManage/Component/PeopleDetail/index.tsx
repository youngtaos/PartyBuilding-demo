import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Image, Space } from "antd";
import styles from "./styles.module.scss";
import { PeopleInfoType } from "../..";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

export type acticleType = {
  articleUrl: string;
  content: string;
  imgSrc: string;
  message: string;
  people: PeopleInfoType[];
  title: string;
};
const PeopleDetail = () => {
  const { state } = useLocation();
  const [people, setPeople] = useState([]);
  const [articles, setArticles] = useState([]);
  const SiteSpiderData = useSelector((state: any) => {
    return state.homeManagement.SiteSpiderData;
  });
  const [postsName, setPostsName] = useState([
    "党员",
    "宣传委员",
    "组织委员",
    "支部书记",
  ]);
  useEffect(() => {
    let arr: any = [];
    const ans: any = [];
    SiteSpiderData.forEach((it: any, index: number) => {
      let people = it.people;
      if (typeof it.people === "string") {
        people = JSON.parse(it.people);
        arr = [...arr, ...people];
      } else {
        arr = [...arr, ...people];
      }
      if (state.name === "") {
        ans.push({
          articleUrl: it.articleUrl,
          content: it.content,
          imgSrc: it.imgSrc,
          message: it.message,
          people: JSON.stringify(people),
          title: it.title,
        });
      } else {
        if (state.name !== "" && people.indexOf(state.name) !== -1) {
          ans.push({
            articleUrl: it.articleUrl,
            content: it.content,
            imgSrc: it.imgSrc,
            message: it.message,
            people: JSON.stringify(people),
            title: it.title,
          });
        }
      }
    });
    setPeople(Array.from(new Set(arr)));
    setArticles(ans);
  }, [SiteSpiderData, state]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrapper}>
        {articles.map((item: acticleType, index: number) => {
          return (
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
        })}
      </div>
      <div className={styles.peopleWrapper}>
        <div className={styles.profileImage}>
          <Avatar
            shape="square"
            size={200}
            icon={<UserOutlined />}
            src={state.avatar}
          />
        </div>
        <div className={styles.info}>
          <p>
            <span>姓名:</span> <span className="age">{state.name}</span>
          </p>
          <Space>
            <div style={{ marginRight: "30px" }}>
              <span>性别:</span> <span className="age">{state.sex}</span>
            </div>
            <div>
              <span>年龄:</span> <span className="age">{state.age}</span>
            </div>
          </Space>
          <p>
            <span>职位:</span>{" "}
            <span className="age">{postsName[state.posts]}</span>
          </p>
          <TextArea value={12333} disabled></TextArea>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetail;
