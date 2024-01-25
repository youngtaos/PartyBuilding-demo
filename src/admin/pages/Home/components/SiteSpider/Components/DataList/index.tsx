import React from "react";
import CountUp from "react-countup";
import { Card, Col, Row, Statistic } from "antd";

const formatter = (value: number) => (
  <CountUp end={value} separator="," formatter={undefined} />
);

type DataListProps = {
  SiteSpiderData: [];
};

const DataList: React.FC<DataListProps> = ({ SiteSpiderData }) => {
  console.log(SiteSpiderData, "datalist");
  return (
    <>
      <Row gutter={16}>
        <Col span={5}>
          <Card bordered>
            <Statistic
              title="本次爬取相关文章"
              value={SiteSpiderData.length}
              valueStyle={{ color: "#3f8600" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card>
            <Statistic
              title="本次爬取相关人员"
              value={10}
              valueStyle={{ color: "#cf1322" }}
              //formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card>
            <Statistic
              title="本次爬取耗时"
              value={120}
              precision={2}
              //formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DataList;
