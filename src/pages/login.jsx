import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginUserApi(values.email, values.password)
        if (res?.data) {
            notification.success({
                message: "Login",
                description: "Login successful",
            })
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            setLoading(false)
            navigate("/")
        }
        else {
            notification.error({
                message: "Login",
                description: JSON.stringify(res?.message),
            })
            setLoading(false)
        }
    }

    const onFinishFailed = () => {
        console.log("failed login")

    }

    return (

        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Login</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: "email",
                                    message: "email is not correct",
                                },
                            ]}
                        >
                            <Input onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />
                        </Form.Item>

                        <Form.Item label={null}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Button loading={loading} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Link to={"/"}>Go To Home Page</Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        <span>Have Not Been An Account? <Link to={"/register"}>Register Here</Link></span>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
}

export default LoginPage;