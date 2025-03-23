import { Button, Input, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserApi } from '../../services/api.service';

const UserForm = (props) => {

    const { loadUser } = props
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelCreateUserClick = async () => {
        const res = await createUserApi(fullName, email, password, phone)
        if (res?.data) {
            notification.success({
                message: "create user",
                description: "Create successful user"
            })
            resetClearModal()
            await loadUser()
        }
        else {
            notification.error({
                message: "create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetClearModal = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalOpen(false);
    }

    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type='primary' onClick={() => setIsModalOpen(true)}>Create User</Button>
            </div>
            <Modal title="Create User" open={isModalOpen} maskClosable={false} okText={"Create"} onOk={handelCreateUserClick} onCancel={resetClearModal}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />

                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />

                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
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
        </div>
    );
}
export default UserForm;
