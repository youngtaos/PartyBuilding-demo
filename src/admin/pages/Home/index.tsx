import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink as Link, Navigate, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getChangeSchemaAction, changePeopleInfoAction } from "./Store/action";

const handleHomePageRedirect = () => {
  window.location.href = "/";
};
const handleLogout = () => {
  axios.get("/api/logout").then((res) => {
    console.log(res);
  });
};
const { Header, Content, Footer, Sider } = Layout;
const getItem = (label: any, key: string, icon: any, children: any) => {
  return {
    key,
    icon,
    children,
    label,
  };
};
const items = [
  getItem(
    <Link to="/data">数据爬取</Link>,
    "/data",
    <VideoCameraOutlined />,
    ""
  ),
  getItem(
    <Link to="/people">支部人员管理</Link>,
    "/people",
    <UserOutlined />,
    ""
  ),
  getItem(
    <div
      onClick={() => {
        handleHomePageRedirect();
      }}
    >
      进入前台页面
    </div>,
    "/front",
    <UserOutlined />,
    ""
  ),
  getItem(
    <div
      onClick={() => {
        handleLogout();
        window.location.href = "/admin.html";
      }}
    >
      退出登录
    </div>,
    "/logout",
    <UserOutlined />,
    ""
  ),
];

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state: any) => {
    return state.homeManagement.schema;
  });
  const changeSchema = (schema: any) => {
    const action = getChangeSchemaAction(schema);
    dispatch(action);
  };
  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });
  const changePeopleInfo = (data: any) => {
    const action = changePeopleInfoAction(data);
    dispatch(action);
  };
  return { schema, changeSchema, peopleInfo, changePeopleInfo };
};

const Home: React.FC = () => {
  const { schema, changeSchema, changePeopleInfo } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    axios.get("/api/showData").then((res) => {
      const data = res?.data.data;
      if (data) {
        changeSchema(data);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/api/getPeopleInfo").then((res) => {
      const data = res?.data.data;
      if (data) {
        changePeopleInfo(data);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      const data = res?.data?.data;
      setIsLogin(data);
    });
  }, [isLogin]);
  return (
    <div className={styles.HomeWrapper}>
      {isLogin ? (
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className={styles.sider}
            onBreakpoint={(broken) => {
              //console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
            }}
          >
            <div
              className={styles.title}
              onClick={() => {
                handleHomePageRedirect();
              }}
            >
              党建管理后台
            </div>
            <Menu
              className={styles.menu}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }} />

            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <Outlet />
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              ©2023 Created by 2020444208 yangtaosen
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Home;
