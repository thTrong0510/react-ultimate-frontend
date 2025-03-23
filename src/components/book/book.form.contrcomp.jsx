import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, uploadImageFile } from "../../services/api.service";

const BookFormContrComp = (props) => {
    const { loadBook } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainText, setMainText] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [author, setAuthor] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [category, setCategory] = useState("")
    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const handelCreateBookClick = async () => {
        const res = await createBookApi(thumbnail, mainText, author, +price, +quantity, category)
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

    const resetClearModal = () => {
        setThumbnail("")
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setIsModalOpen(false)
        setSelectedFile(null)
        setPreview(null)
    }

    const handelUploadFile = async (event) => {
        if (event.target?.files?.length === 0)
            return;

        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0])
            setPreview(URL.createObjectURL((event.target.files[0])))

            const resAvatar = await uploadImageFile(event.target.files[0], "book")
            if (resAvatar?.data?.fileUploaded) {
                console.log(">>>>")
                setThumbnail(resAvatar.data.fileUploaded)
            }
        }
    }

    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type='primary' onClick={() => setIsModalOpen(true)}>Create Book</Button>
            </div>
            <Modal title="Create Book" open={isModalOpen} maskClosable={false} okText={"Create"} onOk={handelCreateBookClick} onCancel={resetClearModal}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>

                    <div>
                        <span>Title</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>

                    <div>
                        <span>Author</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
                        <span>Category</span>
                        <Select
                            defaultValue="Arts"
                            value={category}
                            onChange={(value) => { setCategory(value) }}
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

                            ]}
                        />
                    </div>

                    <div>
                        <span>Price</span>
                        <InputNumber style={{ width: "100%" }} addonAfter="VND" value={price}
                            onChange={(event) => { setPrice(event) }} />
                    </div>

                    <div>
                        <span>Quantity</span>
                        <InputNumber style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }} />
                    </div>

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

                </div>
            </Modal >
        </div >
    );
}

export default BookFormContrComp