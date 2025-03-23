import { DeleteOutlined } from "@ant-design/icons";
import { notification, Popconfirm } from "antd";
import { deleteBookById } from "../../services/api.service";


const DeleteBookPopConfirm = (props) => {

    const { id, loadBook } = props

    const confirmDeleteBook = async () => {
        const res = await deleteBookById(id)
        if (res?.data) {
            notification.success({
                message: "Delete Book",
                description: "Delete successful Book"
            })
            await loadBook()
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
                title="Delete book"
                description="Are you sure to delete this book?"
                onConfirm={confirmDeleteBook}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
        </>
    );
}

export default DeleteBookPopConfirm;