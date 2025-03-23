import { Button, Col, Form, Input, notification, Row, Divider } from "antd";
import { registerUserApi } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerUserApi(values.fullName, values.email, values.password, values.phone)
        if (res?.data) {
            notification.success({
                message: "Register user",
                description: "Register successful user"
            })
            navigate("/login")
        }
        else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message)
            })
        }
    }
    const onFinishFailed = (values) => {
        console.log("")
    }
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "10px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Register</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ padding: "10px" }}
                    >
                        <h3 style={{ textAlign: "center" }}>Register User</h3>


                        <Form.Item
                            label="Username"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    // pattern: new RegExp(/^a-zA-Z0-9/i),
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
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
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button onClick={() => form.submit()} type="primary">Register</Button>
                        </Form.Item>
                    </Form >
                    <Divider style={{ marginTop: "0px" }} />
                    <div style={{ textAlign: "center" }}>
                        <span>Have Not Been An Account? <Link to={"/register"}>Register Here</Link></span>
                    </div>
                </fieldset>
            </Col>
        </Row>

    )
}

export default RegisterPage;