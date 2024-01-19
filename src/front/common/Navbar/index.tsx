import React, { Dispatch, SetStateAction } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import axios from "axios";

interface NavBarProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ setIsLogin }) => {
  const handleManagePageRedirect = () => {
    axios.get("/api/isLogin").then((res) => {
      const data = res.data.data;
      if (data) {
        window.location.href = "/admin.html#/DataPage";
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  };
  return (
    <>
      <FloatButton
        shape="square"
        type="primary"
        style={{ left: 24 }}
        icon={<AppstoreOutlined />}
        onClick={handleManagePageRedirect}
        tooltip={"进入管理页面"}
      />
    </>
  );
};

export default NavBar;
