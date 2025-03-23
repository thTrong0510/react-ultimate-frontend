import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { updateUserAvatar, uploadImageFile } from '../../services/api.service';
const DetailsBookDrawer = (props) => {

    const { isDetailsModalOpen, setIsDetailsModalOpen, dataDetails } = props;

    const onClose = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <>
            <Drawer width={"40vw"} title="Book Details" onClose={onClose} open={isDetailsModalOpen} >
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {dataDetails &&
                        <>
                            <p>ID: {dataDetails._id}</p>
                            <p>Title: {dataDetails.mainText}</p>
                            <p>Author: {dataDetails.Author}</p>
                            <p>Price: {dataDetails.price}</p>
                            <p>Sold: {dataDetails.sold}</p>
                            <p>quantity: {dataDetails.quantity}</p>
                            <p>category: {dataDetails.category}</p>
                            <p>Image:</p>
                            <div style={{ marginTop: '5px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetails.thumbnail}`} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
                            </div>
                        </>
                    }
                </div>
            </Drawer >
        </>
    );
};
export default DetailsBookDrawer;