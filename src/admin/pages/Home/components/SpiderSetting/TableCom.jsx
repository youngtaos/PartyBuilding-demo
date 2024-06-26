import { Pagination, Table, Modal, Switch, message, Tooltip, Tag } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";
import SwitchItem from "./SwitchItem";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import qs from "qs";
const { confirm } = Modal;

const TableCom = ({
  data,
  page,
  setPage,
  total,
  handleGetSpiderList,
  size,
  setSize,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const showConfirm_close = (index) => {
    console.log(index, "yts1");
    confirm({
      title: "你确定要禁用这个爬虫吗?",
      icon: <ExclamationCircleFilled />,
      content: "你确定要禁用这个爬虫吗?",
      onOk() {
        axios
          .post("/api/closeScheduleSpider", qs.stringify({ id: index }), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            console.log(res, "res");
            handleGetSpiderList();
          });
      },
      onCancel() {},
      okText: "确定",
      cancelText: "取消",
    });
  };
  const showConfirm_open = (index) => {
    confirm({
      title: "你确定要启用这个爬虫吗?",
      icon: <ExclamationCircleFilled />,
      content: "你确定要启用这个爬虫吗?",
      onOk() {
        axios
          .post(
            "/api/openScheduleSpider",
            qs.stringify({ id: index, names: JSON.stringify([]) }),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          )
          .then((res) => {
            console.log(res, "res");
            handleGetSpiderList();
          });
      },
      onCancel() {},
      okText: "确定",
      cancelText: "取消",
    });
  };
  const showModal = (item) => {
    setIsModalOpen(true);
    setItemInfo(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "名称",
      width: 150,
      dataIndex: "spiderName",
      key: "1",
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement={"topLeft"} title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "最后爬取时间",
      dataIndex: "lastSpiderTime",
      key: "4",
      width: 200,
    },
    {
      title: "最后有结果时间",
      dataIndex: "lastHaveResultTime",
      key: "5",
      width: 200,
    },
    {
      title: "最后有结果数量",
      dataIndex: "lastSpiderNozeroCount",
      key: "6",
      width: 150,
    },
    {
      title: "爬虫间隔",
      dataIndex: "schedule",
      key: "7",
      width: 100,
      render: (text) => {
        return <>每天{text}点爬取数据</>;
      },
    },

    {
      title: <div style={{ textAlign: "center" }}>操作</div>,
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <a
            onClick={() => {
              showModal(text);
            }}
          >
            编辑
          </a>
          {text.status ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              style={{ color: "red" }}
              onClick={() => {
                showConfirm_close(text.id);
              }}
            >
              禁用
            </a>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              style={{ color: "red" }}
              onClick={() => {
                showConfirm_open(text.id);
              }}
            >
              启用
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
        }}
        pagination={false}
      />

      <EditModal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        itemInfo={itemInfo}
        handleGetSpiderList={handleGetSpiderList}
      />
    </div>
  );
};
export default TableCom;
