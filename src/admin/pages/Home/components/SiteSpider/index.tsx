import { Button, Skeleton, Space, Spin, notification } from "antd";
import styles from "./styles.module.scss";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import DataList from "./Components/DataList";
import { getChangeSiteSpiderDataAction } from "../../Store/action";
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

const SiteSpider: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [lastSpiderTime, setSpiderTime] = useState("");
  const [startTime, setStartTime] = useState<Date>();
  const take = useRef(0);
  const [api, contextHolder] = notification.useNotification();
  let names: Array<string> = [];
  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });

  const SiteSpiderData = useSelector((state: any) => {
    return state.homeManagement.SiteSpiderData;
  });

  const dispatch = useDispatch();
  const changeSiteSpiderData = (spiderData: any) => {
    const action = getChangeSiteSpiderDataAction(spiderData);
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
          {({ name }) =>
            `${name}数据爬取完成! 耗时${(take.current % (1000 * 60)) / 1000}秒`
          }
        </Context.Consumer>
      ),
      placement,
      duration: 20,
    });
  };

  const handleGetData = () => {
    console.log(peopleInfo);
    peopleInfo.forEach((item: any) => {
      names.push(`${item.name}`);
    });
    setSpinning(true);
    setStartTime(new Date());
    axios
      .post("/api/getData", qs.stringify({ names: JSON.stringify(names) }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        setSpinning(false);
        setSpiderTime(getModeTime());

        changeSiteSpiderData(res.data.data);
        openNotification("topRight");
      });
  };

  return (
    <div className={styles.Wrapper}>
      {contextHolder}
      <div className={styles.btnBox}>
        <div className={styles.left}>上次爬取时间：{lastSpiderTime}</div>
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
      </div>
      {spinning ? (
        <Skeleton active />
      ) : (
        <DataList
          SiteSpiderData={SiteSpiderData}
          take={take.current}
        ></DataList>
      )}
    </div>
  );
};

export default SiteSpider;
