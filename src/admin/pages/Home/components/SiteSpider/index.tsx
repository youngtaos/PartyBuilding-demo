import { Button, Skeleton, Space, Spin, notification } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import DataList from "./Components/DataList";
import { getChangeSiteSpiderDataAction } from "../../Store/action";
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

const Context = React.createContext({ name: "网站" });

const SiteSpider: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });
  // const [SiteSpiderData, setSiteSpiderData] = useState(

  // );
  const SiteSpiderData = useSelector((state: any) => {
    return state.homeManagement.SiteSpiderData;
  });

  const dispatch = useDispatch();
  const changeSiteSpiderData = (spiderData: any) => {
    const action = getChangeSiteSpiderDataAction(spiderData);
    dispatch(action);
  };
  const openNotification = (placement: any) => {
    api.info({
      message: `数据爬取成功`,
      description: (
        <Context.Consumer>
          {({ name }) => `${name}数据爬取完成!`}
        </Context.Consumer>
      ),
      placement,
      duration: 20,
    });
  };
  let names: Array<string> = [];
  peopleInfo.forEach((item: any) => {
    names.push(`${item.name}`);
  });

  const handleGetData = () => {
    setSpinning(true);
    axios
      .post("/api/getData", qs.stringify({ names: JSON.stringify(names) }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        setSpinning(false);
        changeSiteSpiderData(res.data.data);
        openNotification("topRight");
      });
  };

  return (
    <div className={styles.Wrapper}>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          handleGetData();
        }}
        disabled={spinning}
      >
        {spinning ? (
          <Space>
            数据爬取中
            <Spin spinning={spinning} style={{ color: "red" }} />
          </Space>
        ) : (
          "爬取数据"
        )}
      </Button>
      {spinning ? (
        <Skeleton active />
      ) : (
        <DataList SiteSpiderData={SiteSpiderData}></DataList>
      )}
    </div>
  );
};

export default SiteSpider;
