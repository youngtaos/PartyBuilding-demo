import React, { useEffect, useRef } from "react";
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

const Echart: React.FC<EChartsOption> = (props: any) => {
  const { option } = props;
  const chartWrapper = useRef<HTMLDivElement>(null);
  const chart = useRef<any>(null);
  useEffect(() => {
    const height = document.getElementById("dora")?.clientHeight;
    const width = document.getElementById("dora")?.clientWidth;
    if (!chartWrapper.current) {
      return;
    }
    chartWrapper.current.style.height = `${height}px`;
    chartWrapper.current.style.width = `${width}px`;
    chart.current = echarts.init(chartWrapper.current, "vintage"); //初始化
  }, []);
  useEffect(() => {
    //每次当option变化时，再次setOptions
    chart.current.setOption(option);
  }, [option]);
  return <div ref={chartWrapper} />;
};

export default Echart;
