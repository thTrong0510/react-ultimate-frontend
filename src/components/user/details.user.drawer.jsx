import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { updateUserAvatar, uploadImageFile } from '../../services/api.service';
const DetailsUserDrawer = (props) => {

    const { isDetailsModalOpen, setIsDetailsModalOpen, dataDetails, setDataDetails, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const onClose = () => {
        setIsDetailsModalOpen(false);
        setDataDetails(null);
        setPreview(null); //khi update avatar xog ko để preview hiện lại
    };

    const handelUploadFile = (event) => {
        if (event.target?.files?.length === 0)
            return;

        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0])
            setPreview(URL.createObjectURL((event.target.files[0])))
        }

    }

    const handelUpdateUserAvatar = async () => {
        //step 1: upload file chỉ trả về 1 tên file với 1 định dạng
        const res = await uploadImageFile(selectedFile, "avatar");

        if (res?.data) {
            //success
            //update user lưu file update real
            const resUpdateAvatar = await updateUserAvatar(dataDetails._id, res.data.fileUploaded, dataDetails.fullName, dataDetails.phone);
            if (resUpdateAvatar?.data) {
                notification.success({
                    message: "Upload Avatar",
                    description: "Upload successful avatar"
                })
                onClose()
                loadUser()
            }
            else {
                notification.error({
                    message: "Error Upload Avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        }
        else {
            // fail
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(res.message)
            })

        }
    }

    return (
        <>
            <Drawer width={"40vw"} title="User Details" onClose={onClose} open={isDetailsModalOpen} >
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {dataDetails &&
                        <>
                            <p>ID: {dataDetails._id}</p>
                            <p>Full Name: {dataDetails.fullName}</p>
                            <p>Email: {dataDetails.email}</p>
                            <p>Phone: {dataDetails.phone}</p>
                            <p>Avatar:</p>
                            <div style={{ marginTop: '5px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetails.avatar}`} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
                            </div>
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
                                    Upload Avatar
                                </label>
                                <input type='file' hidden id='btnUpload' onChange={(event) => handelUploadFile(event)} />
                            </div>
                            {preview &&
                                <>
                                    <div style={{ marginTop: '5px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                                        <img src={preview} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
                                        <Button type='primary' onClick={handelUpdateUserAvatar}>Save</Button>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
            </Drawer >
        </>
    );
};
export default DetailsUserDrawer;