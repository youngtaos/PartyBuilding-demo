import TableCom from "./TableCom";
import styles from "./styles.module.scss";
import { Button, Input, Select, Space, DatePicker, message } from "antd";
import { PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "dayjs/locale/zh-cn";
import AddModal from "./AddModal";
import axios from "axios";
const SpiderSetting = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: "官网爬虫",
      spider: "spider1",
      owner: "",
      lastSpiderTime: "2024-1-1",
      lastSpiderNozeroTime: "2024-1-1",
      LastSpiderNozeroCount: "",
      errorStatus: 1,
    },
    {
      id: 2,
      name: "微信公众号爬虫",
      spider: "spider2",
      owner: "",
      lastSpiderTime: "2024-1-1",
      lastSpiderNozeroTime: "2024-1-1",
      LastSpiderNozeroCount: "",
      errorStatus: 1,
    },
  ]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddOk = () => {
    setIsAddModalOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleGetSpiderList = (type) => {
    axios.get("/api/getSpiderList").then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    handleGetSpiderList();
  }, []);

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.header}>
        <Space>
          <Button type="primary">
            <SyncOutlined
              onClick={() => {
                handleGetSpiderList();
              }}
            />
          </Button>
        </Space>
      </div>
      <TableCom
        data={data}
        page={page}
        setPage={setPage}
        total={total}
        handleGetSpiderList={handleGetSpiderList}
        size={size}
        setSize={setSize}
      />
      <AddModal
        handleAddCancel={handleAddCancel}
        handleAddOk={handleAddOk}
        isAddModalOpen={isAddModalOpen}
        handleGetSpiderList={handleGetSpiderList}
      />
    </div>
  );
};

export default SpiderSetting;
