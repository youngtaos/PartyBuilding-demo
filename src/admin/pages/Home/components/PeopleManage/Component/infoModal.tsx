import { Input, Modal, Select, Form } from "antd";
import React from "react";
import UploadCom from "./UploadCom";

const InfoModal = ({
  ModalData,
  handleOk,
  handleCancel,
  handleInputChange,
  temp,
  handleSelectChange,
  handleCommentChange,
}: {
  ModalData: any;
  handleOk: () => void;
  handleCancel: () => void;
  handleInputChange: (e: unknown) => void;
  temp: any;
  handleSelectChange: (value: number) => void;
  handleCommentChange: (e: unknown) => void;
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
        <Form>
          <Form.Item label="姓名" name="disabled" valuePropName="checked">
            <Input value={temp?.name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="职位" name="disabled" initialValue={temp?.posts}>
            <Select
              value={temp?.posts}
              style={{ width: 120 }}
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
          </Form.Item>
          <Form.Item
            label="备注："
            name={"comment"}
            initialValue={temp?.comment}
          >
            <Input.TextArea
              id="comment"
              style={{ width: "400px" }}
              allowClear
              autoSize={{ minRows: 4 }}
              onChange={handleCommentChange}
            ></Input.TextArea>
          </Form.Item>
        </Form>

        <UploadCom id={temp.id} />
      </Modal>
    </>
  );
};

export default InfoModal;
