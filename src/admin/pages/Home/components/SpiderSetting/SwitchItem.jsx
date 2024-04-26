import { Switch, message } from "antd";
import { useEffect, useState } from "react";

const SwitchItem = ({ text }) => {
  const { id, status } = text;
  const [state, setState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleEditSpiderStatus = (value) => {
    const ans = {
      status: value ? 1 : 2,
      id,
    };
    // editSpiderStatus(ans).then((res) => {
    //   if (!res.code) {
    //     messageApi.open({
    //       type: "success",
    //       content: "状态更新成功",
    //     });
    //   } else {
    //     messageApi.open({
    //       type: "error",
    //       content: res.message?.split(";")[1] || "状态更新失败",
    //     });
    //   }
    // });
  };
  useEffect(() => {
    if (status === 1) {
      setState(true);
    } else {
      setState(false);
    }
  }, [text]);
  return (
    <>
      {contextHolder}
      <Switch
        checked={state}
        onChange={(value) => {
          setState(value);
          handleEditSpiderStatus(value);
        }}
      />
    </>
  );
};

export default SwitchItem;
