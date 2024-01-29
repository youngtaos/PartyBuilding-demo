import { Button, Input } from "antd";
import React, { useState } from "react";

const AvatarCom: React.FC<{ id: number }> = (props) => {
  const [file, setFile] = useState<File>();
  const { id } = props;
  const handleClick = async (event: any) => {
    event.preventDefault();
    const body = new FormData();
    if (file) {
      body.append("file", file);
      body.append("personId", `${id}`);
      const response = await fetch("/api/people/uploadPeopleAvatar", {
        method: "post",
        body,
      });
      const res = await response.json();
    } else {
      alert("请选择文件！");
    }
  };

  return (
    <div>
      <Input
        style={{ marginTop: 10, marginBottom: 10 }}
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <Button
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
