import {
  Modal,
  Input,
  Space,
  Switch,
  message,
  Cascader,
  Form,
  Button,
  Select,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const InputStyle = {
  paddingRight: "100px",
  margin: "10px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const EditModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  handleGetSpiderList,
  itemInfo,
}) => {
  const [options, setOptions] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [spider, setSpider] = useState("");
  const [owner, setOwner] = useState("");
  const [sendSuccInfo, setSendSuccInfo] = useState(false);
  const [sleepPage, setSleepPage] = useState("");
  const [minSpiderSpan, setMinSpiderSpan] = useState("");
  const [maxNodataThreshold, setMaxNodataThreshold] = useState("");
  const [config, setConfig] = useState("");
  const [originUrlType, setOriginUrlType] = useState("");
  const [comment, setComment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [schedule, setSchedule] = useState("");
  const [spiderName, setSpiderName] = useState("");
  useEffect(() => {
    setSpiderName(itemInfo?.spiderName);
    setSchedule(itemInfo?.schedule);
    setSpider(itemInfo?.spider);
    setOwner(itemInfo?.owner);
    setOriginUrlType(itemInfo?.originUrlType);
    setCityId(itemInfo?.cityId);
    setSleepPage(itemInfo?.sleepPage);
    setMinSpiderSpan(itemInfo?.minSpiderSpan);
    setMaxNodataThreshold(itemInfo?.maxNodataThreshold);
    setCityName(itemInfo?.cityRsp);
    if (itemInfo?.sendSuccInfo === 1) {
      setSendSuccInfo(true);
    } else if (itemInfo?.sendSuccInfo === 0) {
      setSendSuccInfo(false);
    }
    if (!itemInfo.config) {
      setConfig(itemInfo?.config);
    } else {
      setConfig(JSON.stringify(JSON.parse(itemInfo?.config), null, 4));
    }

    setComment(itemInfo?.comment);
  }, [itemInfo]);

  const handleFinish = () => {
    const ans = {
      id: itemInfo.id,
      spiderName,
      schedule,
    };
    axios.post("/api/editSpider").then((res) => {
      if (!res.code) {
        messageApi.open({
          type: "success",
          content: "编辑成功",
        });

        // handleGetSpiderList();
        // handleOk();
      } else {
        messageApi.open({
          type: "error",
          content: res.message?.split(";")[1] || "编辑失败",
        });
      }
    });
  };

  const cancel = () => {
    handleCancel();
  };

  const filter = (inputValue, path) => {
    return path.some((option) => option.name.indexOf(inputValue) > -1);
  };

  useEffect(() => {}, []);
  return (
    <div>
      {contextHolder}
      <Modal
        title="编辑"
        open={isModalOpen}
        onOk={handleFinish}
        onCancel={cancel}
        okButtonProps={{ htmlType: "submit" }}
        okText={"确定"}
        cancelText="取消"
        width={900}
        destroyOnClose={true}
      >
        <Form onFinish={handleFinish}>
          <div style={InputStyle}>
            <Form.Item
              label="网站名称："
              name={"name"}
              rules={[{ required: true, message: "网站名称不能为空!" }]}
              initialValue={name}
            >
              <Input
                id={"name"}
                style={{ width: "500px" }}
                allowClear
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>
          <div style={InputStyle}>
            <Form.Item
              label="网站地址："
              name={"url"}
              rules={[{ required: true, message: "网站地址不能为空!" }]}
              initialValue={url}
            >
              <Input
                id={"url"}
                style={{ width: "500px" }}
                allowClear
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>
          <div style={InputStyle}>
            <Form.Item
              label="爬虫名称："
              name={"spider"}
              rules={[{ required: true, message: "爬虫名字不能为空!" }]}
              initialValue={spider}
            >
              <Input
                id={"spider"}
                style={{ width: "500px" }}
                allowClear
                onChange={(e) => {
                  setSpider(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>

          <div style={InputStyle}>
            <Form.Item
              label="最小爬取间隔："
              name={"minSpiderSpan"}
              rules={[{ required: true, message: "最小爬取间隔不能为空!" }]}
              initialValue={minSpiderSpan}
            >
              <Input
                id="minSpiderSpan"
                style={{ width: "500px" }}
                allowClear
                onChange={(e) => {
                  setMinSpiderSpan(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>

          <div style={InputStyle}>
            <Form.Item label="备注：" name={"comment"} initialValue={comment}>
              <Input.TextArea
                id="comment"
                style={{ width: "500px" }}
                allowClear
                autoSize={{ minRows: 4 }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></Input.TextArea>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EditModal;
