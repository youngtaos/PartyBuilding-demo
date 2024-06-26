import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink as Link, Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Layout, Menu, Skeleton, theme } from "antd";
import {
  AppstoreOutlined,
  EnterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getChangeSchemaAction, changePeopleInfoAction } from "./Store/action";
import "./index.css";
const handleHomePageRedirect = () => {
  window.location.href = "/";
};
const handleLogout = () => {
  axios.get("/api/logout").then((res) => {
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
  getItem(
    <Link to="/DataPage">数据分析</Link>,
    "/DataPage",
    <PieChartOutlined />
  ),
  getItem(<span>数据爬取</span>, "/data", <PieChartOutlined />, [
    getItem(
      <Link to="/SiteSpider">网站爬取</Link>,
      "/SiteSpider",
      <PieChartOutlined />
    ),
    getItem(
      <Link to="WxSpider">公众号爬取</Link>,
      "/WxSpider",
      <PieChartOutlined />
    ),
    getItem(
      <Link to="/spiderSetting">爬虫配置</Link>,
      "/spiderSetting",
      <PieChartOutlined />
    ),
  ]),
  getItem(<Link to="/people">支部成员</Link>, "/people", <UserOutlined />, ""),
  getItem(<span>文章助手</span>, "/article", <SnippetsOutlined />, [
    getItem(
      <Link to="/onlineArticle">线上文章</Link>,
      "/onlineArticle",
      <SnippetsOutlined />
    ),
    getItem(
      <Link to="/yourArticle">你的文章</Link>,
      "/yourArticle",
      <SnippetsOutlined />
    ),
  ]),
  getItem(
    <div
      onClick={() => {
        handleHomePageRedirect();
      }}
    >
      前台页面
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
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
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          {/* <div
            className={styles.title}
            onClick={() => {
              handleHomePageRedirect();
            }}
          >
            数据挖掘及成稿系统
          </div> */}
          <Menu
            className={styles.menu}
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={[routeType]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>

          <Content
            style={{
              margin: "10px 16px 10px 10px",
            }}
          >
            <div
              style={{
                padding: 20,
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                background: colorBgContainer,
                overflow: "hidden",
                overflowY: "scroll",
                boxSizing: "border-box",
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
