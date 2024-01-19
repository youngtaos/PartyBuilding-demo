import { Button } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import qs from "qs";
import DataList from "./Components/DataList";

export interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
  isReaded: boolean;
  articleUrl: string;
}

const SiteSpider: React.FC = () => {
  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });

  const temp: any = peopleInfo.map((item: any) => {
    return {
      value: parseInt(`${item.articleNum}`),
      name: `${item.name}`,
    };
  });
  let names: Array<string> = [];
  peopleInfo.forEach((item: any) => {
    names.push(`${item.name}`);
  });
  const handleGetData = () => {
    axios
      .post("/api/getData", qs.stringify({ names: JSON.stringify(names) }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("success");
      });
  };

  return (
    <div className={styles.Wrapper}>
      <Button
        type="primary"
        onClick={() => {
          handleGetData();
        }}
      >
        爬取数据
      </Button>

      <DataList />
    </div>
  );
};

export default SiteSpider;
