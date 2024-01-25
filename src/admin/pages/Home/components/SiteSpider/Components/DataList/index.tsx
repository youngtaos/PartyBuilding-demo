import React, { useEffect, useState } from "react";
import { Card, Col, Row, Space, Statistic } from "antd";
import People from "../PeopleList/People";
import ArticleList from "../ArticleList";

type DataListProps = {
  SiteSpiderData: [];
  take: number;
};

const DataList: React.FC<DataListProps> = ({ SiteSpiderData, take }) => {
  const [people, setPeople] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const arr: any = [];
    const ans: any = [];
    SiteSpiderData.forEach((it: any, index) => {
      arr.push(...it.people);
      ans.push({
        articleUrl: it.articleUrl,
        content: it.content,
        imgSrc: it.imgSrc,
        message: it.message,
        people: it.people,
        title: it.title,
      });
    });
    setPeople(Array.from(new Set(arr)));
    setArticles(ans);
    console.log(SiteSpiderData, "siteSpiderData");
  }, [SiteSpiderData]);

  return (
    <Space direction="vertical" size={20}>
      <Row gutter={16}>
        <Col span={5}>
          <Card bordered>
            <Statistic
              title="爬取相关文章"
              value={SiteSpiderData.length}
              valueStyle={{ color: "#3f8600" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card>
            <Statistic
              title="爬取相关人员"
              value={people.length}
              valueStyle={{ color: "#cf1322" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Space size={[24, 16]} wrap>
        {people.map((it, index) => {
          return <People key={index} name={it}></People>;
        })}
      </Space>
      <ArticleList articles={articles}></ArticleList>
    </Space>
  );
};

export default DataList;
