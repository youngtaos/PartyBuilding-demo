import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
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
          const data = res.data.data;
          setIsLogin(data);
        } else {
          message.error(res.data.errMsg);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.loginWrapper}>
      {isLogin ? (
        <Navigate to="/data" />
      ) : (
        <div className={styles.loginContainer}>
          <Form
            className={styles.login}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={
                <span style={{ fontSize: 22, fontWeight: "bold" }}>账号</span>
              }
              name="username"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ fontSize: 22, fontWeight: "bold" }}>密码</span>
              }
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
              <Button className={styles.subtn} type="text" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
