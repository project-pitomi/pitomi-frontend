import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";

import { setToken } from "../util.jsx";

const login = () => {
  const router = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    const endpoint = "/graphql";
    const query = `
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }    
    `;
    const { username, password, remember } = values;

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, password },
      }),
    });
    const { data } = await resp.json();
    if (data.login) {
      const { token } = data.login;
      setToken(token);
      router.push("/");
    }
  };

  return (
    <Form
      {...layout}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: "max-content", margin: "20px auto", padding: "50px" }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default login;
