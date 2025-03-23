import { EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useState } from 'react';
import UpdateUserModal from './update.user.modal';
import DetailsUserDrawer from './details.user.drawer';
import DeleteUserPopConfirm from './delete.user.popconfirm';
const UserTable = (props) => {
    const { dataUser, loadUser, current, setCurrent, pageSize, setPageSize, total } = props
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDetails, setDataDetails] = useState(null)

    const columns = [
        {
            title: 'Number Order',
            render: (_, record, index) => {
                return (
                    <span>{pageSize * (current - 1) + index + 1}</span>
                );
            },
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a onClick={() => { setDataDetails(record); setIsDetailsModalOpen(true) }}>{record._id}</a>
                    </>
                );
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            // key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <EditOutlined onClick={() => { setDataUpdate(record); setIsUpdateModalOpen(true); }} style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteUserPopConfirm id={record._id} loadUser={loadUser} />
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination?.current && pagination?.pageSize) {
            //+variable: convert variable to int
            if (+current != +pagination.current) {
                setCurrent(+pagination.current);
            }
            if (+pageSize != +pagination.pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    return (
        <>
            <Table
                dataSource={dataUser} columns={columns} rowKey={'_id'}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                        }
                    }
                }
                onChange={onChange}
            />
            <UpdateUserModal
                isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                loadUser={loadUser} />
            <DetailsUserDrawer isDetailsModalOpen={isDetailsModalOpen} setIsDetailsModalOpen={setIsDetailsModalOpen} dataDetails={dataDetails} setDataDetails={setDataDetails} loadUser={loadUser} />
        </>
    );

}
export default UserTable;