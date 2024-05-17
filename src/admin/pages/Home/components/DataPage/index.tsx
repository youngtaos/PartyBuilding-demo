import { Button } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Echart from "./Components/Echart/index";
import * as echarts from "echarts/core";
import { Pie, Bar } from "@ant-design/plots";

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
        text: "",
        left: "center",
        top: 0,
        textStyle: {
          color: "black",
          fontWeight: "bold",
          fontSize: 16,
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
            fontSize: 14,
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
  const config = {
    data: [
      { type: "男", value: 11 },
      { type: "女", value: 3 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  const data = [
    {
      labelName: "2024年文章数",
      value: 10,
    },
    {
      labelName: "2023年文章数",
      value: 42,
    },
    {
      labelName: "2022年文章数",
      value: 30,
    },
    {
      labelName: "2021年文章数",
      value: 36,
    },
  ];
  const config2 = {
    data,
    xField: "labelName",
    yField: "value",
    paddingRight: 80,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }: any) => {
          return `${(originData.value / 1000) * 100}% | ${originData.value}`;
        },
        position: "right",
        dx: 80,
        style: {
          fill: "#aaa",
          fillOpacity: 1,
          fontSize: 14,
        },
      },
      style: {
        fill: "#eee",
      },
    },
    scale: {
      y: {
        domain: [0, 100],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    interaction: {
      elementHighlightByColor: false,
    },
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.DataContent}>
        <div id="dora" className={styles.dora}>
          <Echart option={option} />
        </div>
        <div className={styles.left}>
          <Pie {...config} width={200} height={300} className={styles.one} />
          <Bar {...config2} className={styles.two} width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

export default DataPage;
