import React, { useEffect, useState } from "react";
import { Card, Col, Row, Space, Statistic } from "antd";
import People from "../PeopleList/People";
import ArticleList from "../ArticleList";

type DataListProps = {
  WxSpiderData: [];
  take: number;
  lastSpiderTime: string;
};

const DataList: React.FC<DataListProps> = ({
  WxSpiderData,
  take,
  lastSpiderTime,
}) => {
  const [people, setPeople] = useState([]);
  const [articles, setArticles] = useState([]);
  const [param, setParam] = useState("");
  useEffect(() => {
    let arr: any = [];
    const ans: any = [];
    WxSpiderData.forEach((it: any, index) => {
      let people = it.people;
      if (typeof it.people === "string") {
        people = JSON.parse(it.people);
        arr = [...arr, ...people];
      } else {
        arr = [...arr, ...people];
      }
      if (param === "") {
        ans.push({
          articleUrl: it.articleUrl,
          content: it.content,
          imgSrc: it.imgSrc,
          message: it.message,
          people,
          title: it.title,
        });
      } else {
        if (param !== "" && people.indexOf(param) !== -1) {
          ans.push({
            articleUrl: it.articleUrl,
            content: it.content,
            imgSrc: it.imgSrc,
            message: it.message,
            people,
            title: it.title,
          });
        }
      }
    });
    setPeople(Array.from(new Set(arr)));
    setArticles(ans);
  }, [WxSpiderData, param]);

  return (
    <Space direction="vertical" size={20}>
      <Row gutter={16}>
        <Col span={5}>
          <Card bordered style={{ background: "#C30D23" }}>
            <Statistic
              title={<div style={{ color: "whitesmoke" }}>相关文章</div>}
              value={articles.length}
              valueStyle={{ color: "whitesmoke", fontSize: "19px" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered style={{ background: "#C30D23" }}>
            <Statistic
              title={<div style={{ color: "whitesmoke" }}>相关人员</div>}
              value={people.length}
              valueStyle={{ color: "whitesmoke", fontSize: "19px" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered style={{ background: "#C30D23" }}>
            <Statistic
              title={<div style={{ color: "whitesmoke" }}>最近爬取</div>}
              value={lastSpiderTime}
              valueStyle={{ color: "whitesmoke", fontSize: "19px" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Space size={[24, 16]} wrap={false}>
        {people.map((it, index) => {
          return <People key={index} name={it} setParam={setParam}></People>;
        })}
      </Space>
      <ArticleList articles={articles}></ArticleList>
    </Space>
  );
};

export default DataList;
