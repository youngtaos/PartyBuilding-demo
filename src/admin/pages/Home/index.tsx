import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  NavLink as Link,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  EnterOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getChangeSchemaAction, changePeopleInfoAction } from "./Store/action";

const handleHomePageRedirect = () => {
  window.location.href = "/";
};
const handleLogout = () => {
  axios.get("/api/logout").then((res) => {
    console.log(res, "res");
    window.location.href = "/";
  });
};
const { Header, Content, Footer, Sider } = Layout;
const getItem = (label: any, key: string, icon: any, children?: any) => {
  return {
    key,
    icon,
    children,
    label,
  };
};
const useRouteType = () => {
  const untis = useLocation().pathname.split("/");
  return untis[untis.length - 1];
};

const items = [
  getItem(<Link to="/data">数据爬取</Link>, "/data", <PieChartOutlined />),
  getItem(
    <Link to="/people">支部人员管理</Link>,
    "/people",
    <UserOutlined />,
    ""
  ),
  getItem(
    <Link to="/article">文章编辑</Link>,
    "/article",
    <SnippetsOutlined />,
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
    <AppstoreOutlined />,
    ""
  ),
  getItem(
    <div onClick={handleLogout}>退出登录</div>,
    "/logout",
    <EnterOutlined />,
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
  const { changeSchema, changePeopleInfo } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const routeType = useRouteType();
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
    axios.get("/api/people/getPeopleInfo").then((res) => {
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
    if (!isLogin) {
      window.location.href = "/";
    }
  }, [isLogin]);
  return (
    <div className={styles.HomeWrapper}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          className={styles.sider}
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <div
            className={styles.title}
            onClick={() => {
              handleHomePageRedirect();
            }}
          >
            智能党建信息系统
          </div>
          <Menu
            className={styles.menu}
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={[routeType]}
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
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
