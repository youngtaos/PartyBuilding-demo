import React from "react";
import { useSelector } from "react-redux";
import { Divider, List, Typography } from "antd";
import { data } from "../..";

const DataList = () => {
  const schema = useSelector((state: any) => {
    return state.homeManagement.schema;
  });
  return (
    <>
      <List
        size="small"
        header="数据"
        footer={<div style={{ fontWeight: "bold" }}>到底啦</div>}
        bordered
        dataSource={schema}
        renderItem={(item: data) => (
          <List.Item>
            <a href={item.articleUrl} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </List.Item>
        )}
      />
    </>
  );
};

export default DataList;
