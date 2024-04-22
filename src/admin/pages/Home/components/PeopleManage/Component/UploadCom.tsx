import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { PlusOutlined } from "@ant-design/icons";

const AvatarCom: React.FC<{ id: number }> = (props) => {
  const [file, setFile] = useState<File>();
  const [api, contextHolder] = notification.useNotification();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = props;
  const handleClick = async (event: any) => {
    event.preventDefault();
    const body = new FormData();
    if (file) {
      body.append("file", file);
      body.append("personId", `${id}`);
      fetch("/api/people/uploadPeopleAvatar", {
        method: "post",
        body,
      }).then((response) => {
        return response.json();
      });

      api.info({
        message: `上传成功，请继续操作`,
        duration: 5,
        type: "success",
      });
    } else {
      api.info({
        message: `请先选择图片上传`,
        duration: 5,
        type: "warning",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <div className={styles.uploadImage}>
        <div className={styles.child}>
          <div className={styles.fileUploadContainer}>
            <Input
              className={styles.fileInput}
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
                const selectedFile = e.target.files?.[0];
                setFile(selectedFile);
                if (selectedFile) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(selectedFile);
                } else {
                  setImagePreview(null || "");
                }
              }}
            />
            <PlusOutlined className={styles.plusIcon} />
          </div>
        </div>
        <div className={styles.child}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
      </div>
      <Button
        style={{ width: "100%" }}
        type={"primary"}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        上传
      </Button>
    </div>
  );
};

export default AvatarCom;
