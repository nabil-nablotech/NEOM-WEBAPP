import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { CustomUploadProps } from '../../types/CustomDrawerTypes';
import { Box } from '@mui/material';
import styles from './index.module.css'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};



const StyledUpload = styled(Upload)`
    .upload-wrapper .ant-upload.ant-upload-select-picture-card,
    .ant-upload-select-picture-card {
        width: 100% !important;
        height: auto;
        aspect-ratio: 1/1;
    }
`

const CustomUpload_basic = ({
    title
}: CustomUploadProps) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <Box component="div">
                {/* WIP */}
                <ImageOutlinedIcon />
            </Box>
            <div style={{ marginTop: 8 }}>{title}</div>
        </div>
    );


    return (
        <StyledUpload
            name="avatar"
            listType="picture-card"
            className={`upload-wrapper ${styles['upload-wrapper']}`}
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}

        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </StyledUpload>
    );
};


export default CustomUpload_basic;