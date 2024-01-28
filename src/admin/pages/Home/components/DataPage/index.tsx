import { Button } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Echart from "./Components/Echart/index";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import qs from "qs";
import DataList from "./Components/DataList";
echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
export type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
  | PieSeriesOption
>;
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

const DataPage: React.FC = () => {
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
  const [option, setOption] = useState<EChartsOption>({});
  useEffect(() => {
    setOption({
      backgroundColor: "white",
      title: {
        text: "支部成员文章爬取数据",
        left: "center",
        top: 0,
        textStyle: {
          color: "black",
          fontWeight: "bold",
          fontSize: 22,
        },
      },

      tooltip: {
        trigger: "item",
      },

      visualMap: {
        show: false,
        min: 0,
        max: 8,
        inRange: {
          colorLightness: [0, 0.5],
        },
      },
      series: [
        {
          name: "相关文章数量",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          data: temp,
          roseType: "radius",
          label: {
            color: "rgb(232,200,100)",
            fontSize: 20,
          },
          labelLine: {
            lineStyle: {
              color: "black",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(232,0,0, 0.5)",
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    });
  }, [peopleInfo]);
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
      <div className={styles.DataContent}>
        <div className={styles.left}>
          <DataList />
        </div>
        <div id="dora" className={styles.dora}>
          <Echart option={option} />
        </div>
      </div>
    </div>
  );
};

export default DataPage;
