import { Button, Col, Divider, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import { useState } from "react";
import { createBookApi, uploadImageFile } from "../../services/api.service";

const BookFormUncontrComp = (props) => {
    const { loadBook } = props
    const [form] = Form.useForm();
    const [preview, setPreview] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)

    const handelUploadFile = (event) => {
        if (event.target?.files?.length === 0)
            return;

        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0])
            setPreview(URL.createObjectURL((event.target.files[0])))
        }
    }

    const onFinish = async (values) => {
        const thumbnail = selectedFile ? await uploadImageFile(selectedFile, "book") : null
        if (thumbnail) {
            const { mainText, author, price, quantity, category } = values
            const res = await createBookApi(thumbnail.data.fileUploaded, mainText, author, price, quantity, category)
            if (res?.data) {
                notification.success({
                    message: "create book",
                    description: "Create successful book"
                })
                resetClearModal()
                await loadBook()
                setIsModalOpen(false)
            }
            else {
                notification.error({
                    message: "create book",
                    description: JSON.stringify(res.message)
                })
            }
        }
        else {
            console.log("null thumbnail")
        }
    }

    const resetClearModal = () => {
        form.resetFields()
        setIsModalOpen(false)
    }

    const handelCreateBookClick = async () => {
        await form.submit()
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type='primary' onClick={() => setIsModalOpen(true)}>Create Book</Button>
            </div>
            <Row justify={"center"} style={{ marginTop: "30px", position: "fixed", top: "50%", left: "50", transform: "translate: -50% -50%" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                        <legend>Login</legend>
                        <Modal title="Create Book" open={isModalOpen} maskClosable={false} okButtonProps={{ loading: loadingModal }} okText={"Create"} onOk={handelCreateBookClick} onCancel={resetClearModal}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            >

                                <Form.Item
                                    label="Title"
                                    name="mainText"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your title!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />
                                </Form.Item>

                                <Form.Item
                                    label="Author"
                                    name="author"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input author!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />
                                </Form.Item>

                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        },
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} addonAfter="VND" onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />
                                </Form.Item>

                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input quantity!',
                                        },
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} onKeyDown={(event) => { if (KeyboardEvent.event == "Enter") form.submit() }} />

                                </Form.Item>

                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input category!',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{
                                            width: "100%",
                                        }}
                                        options={[
                                            { value: 'Arts', label: 'Arts' },
                                            { value: 'Business', label: 'Business' },
                                            { value: 'Comics', label: 'Comics' },

                                            { value: 'Cooking', label: 'Cooking' },
                                            { value: 'Entertainment', label: 'Entertainment' },
                                            { value: 'History', label: 'History' },

                                            { value: 'Music', label: 'Music' },
                                            { value: 'Sports', label: 'Sports' },
                                            { value: 'Teen', label: 'Teen' },
                                            { value: 'Travel', label: 'Travel' },

                                        ]} />
                                </Form.Item>

                            </Form>
                            <Divider />
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <div>Image thumbnail</div>
                                <div>
                                    <label htmlFor='btnUpload' style={{
                                        display: 'flex',
                                        width: 'fit-content',
                                        maginTop: '15px',
                                        padding: '5px 10px',
                                        background: 'orange',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>
                                        Upload
                                    </label>
                                    <input type='file' hidden id='btnUpload' onChange={(event) => handelUploadFile(event)} onClick={(event) => event.target.value = null} />
                                </div>
                                {preview &&
                                    <>
                                        <div style={{ marginTop: '5px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                                            <img src={preview} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
                                        </div>
                                    </>
                                }
                            </div>
                        </Modal>
                    </fieldset>
                </Col>
            </Row>
        </>
    );
}

export default BookFormUncontrComp;