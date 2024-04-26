import {
  Modal,
  Input,
  Space,
  Switch,
  message,
  Select,
  Cascader,
  Form,
} from "antd";
import { useEffect, useState } from "react";
// import { addSpider } from "../../../../http/api/spider";

const InputStyle = {
  paddingRight: "100px",
  margin: "10px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const AddModal = ({
  isAddModalOpen,
  handleAddCancel,
  handleAddOk,
  handleGetSpiderList,
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [spider, setSpider] = useState("");
  const [owner, setOwner] = useState("");
  const [sendSuccInfo, setSendSuccInfo] = useState("");
  const [sleepPage, setSleepPage] = useState("");
  const [minSpiderSpan, setMinSpiderSpan] = useState("");
  const [comment, setComment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = () => {
    const ans = {
      name,
      url,
      spider,
      owner,
      sendSuccInfo: sendSuccInfo ? 1 : 0,
      sleepPage,
      minSpiderSpan,
      comment,
    };
    // addSpider(ans).then((res) => {
    //   if (!res.code) {
    //     messageApi.open({
    //       type: "success",
    //       content: "添加成功",
    //     });
    //     handleGetSpiderList();
    //     handleAddOk();
    //   } else {
    //     messageApi.open({
    //       type: "error",
    //       content: res.message?.split(";")[1] || "添加失败",
    //     });
    //   }
    // });
  };

  const cancel = () => {
    handleAddCancel();
  };
  useEffect(() => {}, []);
  return (
    <div>
      {contextHolder}
      <Modal
        title="添加"
        open={isAddModalOpen}
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
            >
              <Input
                id={"name"}
                style={{ width: "500px" }}
                value={name}
                allowClear
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>
          <div style={InputStyle}>
            <Form.Item
              label="爬虫名称："
              name={"spider"}
              rules={[{ required: true, message: "爬虫名字不能为空!" }]}
            >
              <Input
                id={"spider"}
                style={{ width: "500px" }}
                value={spider}
                allowClear
                onChange={(e) => {
                  setSpider(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>

          <div style={InputStyle}>
            <Form.Item
              label="爬虫延时时间（秒）："
              name={"sleepPage"}
              rules={[{ required: true, message: "爬虫延时时间不能为空!" }]}
            >
              <Input
                id="sleepPage"
                style={{ width: "500px" }}
                value={sleepPage}
                allowClear
                onChange={(e) => {
                  setSleepPage(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>
          <div style={InputStyle}>
            <Form.Item
              label="最小爬取间隔："
              name={"minSpiderSpan"}
              rules={[{ required: true, message: "最小爬取间隔不能为空!" }]}
            >
              <Input
                id="minSpiderSpan"
                style={{ width: "500px" }}
                value={minSpiderSpan}
                allowClear
                onChange={(e) => {
                  setMinSpiderSpan(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </div>
          <div style={InputStyle}>
            <Form.Item label="备注：" name={"comment"}>
              <Input.TextArea
                id="comment"
                style={{ width: "500px" }}
                value={comment}
                allowClear
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

export default AddModal;
