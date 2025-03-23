import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import DetailsBookDrawer from "./details.book.drawer";
import DeleteBookPopConfirm from "./delete.book.popconfirm";

const BookTable = (props) => {

    const { dataBook, loadBook, current, setCurrent, pageSize, setPageSize, total } = props
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
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
            title: 'Title',
            dataIndex: 'mainText',
            // key: 'age',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            // key: 'address',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            // key: 'address',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            // key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteBookPopConfirm id={record._id} loadBook={loadBook} />
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination?.current && pagination?.pageSize) {
            //+variable: convert variable to int
            if (+current != +pagination.current) {
                setCurrent(+pagination.current);
                console.log(">>>>on chnange")
            }
            if (+pageSize != +pagination.pageSize) {
                setPageSize(+pagination.pageSize);
                console.log(">>>>on chnange")
            }
        }
    };

    return <>
        <Table
            dataSource={dataBook} columns={columns} rowKey={'_id'}
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
        <DetailsBookDrawer isDetailsModalOpen={isDetailsModalOpen} setIsDetailsModalOpen={setIsDetailsModalOpen} dataDetails={dataDetails} />
    </>
}

export default BookTable