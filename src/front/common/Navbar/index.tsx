import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import styles from "./styles.module.scss";
const handleManagePageRedirect = () => {
  window.location.href = "/admin.html#/data";
};
const NavBar: React.FC = () => {
  return (
    <>
      <FloatButton
        shape="square"
        type="primary"
        style={{ left: 24 }}
        icon={<AppstoreOutlined />}
        onClick={() => {
          handleManagePageRedirect();
        }}
        tooltip={"进入管理页面"}
      />
    </>
  );
};

export default NavBar;
