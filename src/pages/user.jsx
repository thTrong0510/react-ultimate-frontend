import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useContext, useEffect, useState } from 'react'
import { fetchAllUsers, getAccountApi } from "../services/api.service";

const UserPage = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(3)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        loadUser()
    }, [current, pageSize])

    const loadUser = async () => {
        const res = await fetchAllUsers(current, pageSize)
        if (res?.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <hr></hr>
            <UserTable
                dataUser={dataUser} loadUser={loadUser}
                current={current} setCurrent={setCurrent}
                pageSize={pageSize} setPageSize={setPageSize}
                total={total} />
        </div>
    );
}

export default UserPage;