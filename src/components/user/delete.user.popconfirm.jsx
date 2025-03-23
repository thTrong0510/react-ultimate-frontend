import { DeleteOutlined } from "@ant-design/icons";
import { notification, Popconfirm } from "antd";
import { deleteUserById } from "../../services/api.service";


const DeleteUserPopConfirm = (props) => {

    const { id, loadUser } = props

    const confirmDeleteUser = async () => {
        const res = await deleteUserById(id)
        if (res?.data) {
            notification.success({
                message: "Delete user",
                description: "Delete successful user"
            })
            await loadUser()
        }
        else {
            notification.error({
                message: JSON.stringify(res.error),
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <>
            <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
                onConfirm={confirmDeleteUser}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
        </>
    );
}

export default DeleteUserPopConfirm;