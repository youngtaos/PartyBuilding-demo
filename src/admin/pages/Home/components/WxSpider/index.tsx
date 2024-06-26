import { Button, Skeleton, Space, Spin, notification } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import DataList from "./Components/DataList";
import { getChangeWxSpiderDataAction } from "../../Store/action";
import { getModeTime } from "../../../../util";
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

const WxSpider: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [lastSpiderTime, setLastSpiderTime] = useState(
    JSON.parse(localStorage.getItem("siteLastSpiderTime") || JSON.stringify(""))
  );
  const [startTime, setStartTime] = useState<Date>();

  const [api, contextHolder] = notification.useNotification();
  const isFirst = useRef(true);
  const take = useRef(0);
  let names: Array<string> = [];

  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });

  const schema = useSelector((state: any) => {
    return state.homeManagement.schema;
  });

  const WxSpiderData = useSelector((state: any) => {
    return state.homeManagement.WxSpiderData;
  });

  const dispatch = useDispatch();
  const changeWxSpiderData = (spiderData: any) => {
    const action = getChangeWxSpiderDataAction(spiderData);
    dispatch(action);
  };
  const openNotification = (placement: any) => {
    if (startTime !== undefined) {
      const endTime: Date = new Date();
      const ans = endTime.getTime() - startTime.getTime();
      take.current = ans;
    }
    api.info({
      message: `数据爬取成功`,
      description: (
        <Context.Consumer>
          {({ name }) => `${name}数据爬取完成! `}
        </Context.Consumer>
      ),
      placement,
      duration: 20,
    });
  };

  const handleGetData = () => {
    peopleInfo.forEach((item: any) => {
      names.push(`${item.name}`);
    });
    setSpinning(true);
    setStartTime(new Date());
    axios
      .post("/api/getWxData", qs.stringify({ names: JSON.stringify(names) }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        setSpinning(false);
        localStorage.setItem(
          "siteLastSpiderTime",
          JSON.stringify(getModeTime() || "")
        );

        changeWxSpiderData(res.data.data);
        openNotification("topRight");
      });
  };

  useEffect(() => {
    axios.get("/api/showWxData").then((res) => {
      const data = res?.data.data;
      if (data) {
        changeWxSpiderData(data);
        isFirst.current = false;
      }
    });
  }, [isFirst]);

  useEffect(() => {
    setLastSpiderTime(
      JSON.parse(
        localStorage.getItem("siteLastSpiderTime") || JSON.stringify("")
      )
    );
  }, []);
  return (
    <div className={styles.Wrapper}>
      {contextHolder}
      <div className={styles.btnBox}>
        <div className={styles.left}>爬取公众号信息</div>
        <Button
          type="primary"
          style={{ background: "red", color: "white" }}
          onClick={() => {
            handleGetData();
          }}
          disabled={spinning}
        >
          {spinning ? <Space>爬取中</Space> : "爬取"}
        </Button>
      </div>
      <Spin spinning={spinning} style={{ color: "red" }}>
        <div className="content" />
      </Spin>
      {spinning ? (
        <Skeleton active />
      ) : (
        <DataList
          WxSpiderData={WxSpiderData}
          take={take.current}
          lastSpiderTime={lastSpiderTime}
        ></DataList>
      )}
    </div>
  );
};

export default WxSpider;
