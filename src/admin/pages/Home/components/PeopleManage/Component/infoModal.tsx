import { Input, Modal, Select } from "antd";
import React from "react";
import UploadCom from "./UploadCom";

const InfoModal = ({
  ModalData,
  handleOk,
  handleCancel,
  handleInputChange,
  temp,
  handleSelectChange,
}: {
  ModalData: any;
  handleOk: () => void;
  handleCancel: () => void;
  handleInputChange: (e: unknown) => void;
  temp: any;
  handleSelectChange: (value: number) => void;
}) => {
  return (
    <>
      <Modal
        title="信息编辑"
        open={ModalData.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <label>姓名</label>
        <Input value={temp?.name} onChange={handleInputChange} />
        <Select
          value={temp?.posts}
          style={{ width: 120, marginTop: 20 }}
          onChange={handleSelectChange}
          options={[
            {
              value: 0,
              label: "党员",
            },
            {
              value: 1,
              label: "宣传委员",
            },
            {
              value: 2,
              label: "组织委员",
            },
            {
              value: 3,
              label: "支部书记",
            },
          ]}
        />
        <UploadCom id={temp.id} />
      </Modal>
    </>
  );
};

export default InfoModal;
