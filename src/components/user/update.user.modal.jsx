import { Input, Modal, notification } from "antd"
import { useEffect, useState } from "react"
import { updateUserApi } from "../../services/api.service"

const UpdateUserModal = (props) => {

    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, loadUser } = props

    useEffect(() => fillUpdateModelData(dataUpdate), [dataUpdate])

    const fillUpdateModelData = (dataUser) => {
        if (dataUser) {
            setId(dataUser._id)
            setFullName(dataUser.fullName);
            setPhone(dataUser.phone);
        }
    }

    const handelUpdateUserClick = async () => {
        const res = await updateUserApi(id, fullName, phone)
        if (res?.data) {
            notification.success({
                message: "Update user",
                description: "Update successful user"
            })
            resetClearModal()
            await loadUser()
        }
        else {
            notification.error({
                message: JSON.stringify(res.error),
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetClearModal = () => {
        setId("");
        setFullName("");
        setPhone("");
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    return (
        <>
            <Modal title="Update User" open={isUpdateModalOpen} maskClosable={false} okText={"Save"} onOk={handelUpdateUserClick} onCancel={resetClearModal}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Id</span>
                        <Input
                            value={id}
                            onChange={(event) => { setId(event.target.value) }}
                            disabled={true}
                        />

                    </div>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />

                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateUserModal;