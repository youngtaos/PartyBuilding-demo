import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface LoginProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ isLogin, setIsLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onFinish = (values: any) => {
    axios
      .post(
        "/api/login",
        qs.stringify({
          username: values.username,
          password: values.password,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then((res) => {
        if (res.data.data) {
          window.location.href = "/admin.html#/data";
        } else {
          message.error(res.data.errMsg);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!isLogin) {
    return (
      <div>
        <Form
          className={styles.loginContainer}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span>账号</span>}
            name="username"
            rules={[{ required: true, message: <span>请输入账号</span> }]}
            style={{ width: "60%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span>密码</span>}
            name="password"
            style={{ width: "60%" }}
            rules={[
              {
                required: true,
                message: <span style={{ color: "blue" }}>请输入密码</span>,
              },
            ]}
          >
            <Input.Password
              type="password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          <Form.Item style={{ width: "50%" }}>
            <Button className={styles.subtn} type="text" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <div
            className={styles.rightBottom}
            onClick={() => {
              setIsLogin(true);
            }}
          ></div>
        </Form>
      </div>
    );
  } else {
    return null;
  }
};

export default Login;
