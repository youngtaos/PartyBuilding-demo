import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { Navigate } from "react-router-dom";
import NavBar from "../../../front/common/Navbar/index";

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
    <div>
      <NavBar></NavBar>
      {isLogin ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.loginWrapper}>
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
              label="账号"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
              <Button type="primary" htmlType="submit">
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
