import React from "react";
import { FloatButton } from "antd";

const goPoliticalPage = () => {
  window.open("https://yurenhao.sizhengwang.cn");
};

const MyFloatButton: React.FC = () => (
  <FloatButton
    type={"primary"}
    shape="square"
    style={{
      right: 60,
      width: 60,
      height: 60,
      display: "flex",
    }}
    onClick={goPoliticalPage}
    tooltip={<div>全国高校思想政治工作网</div>}
  />
);

export default MyFloatButton;
