import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Box, Grid } from "@mui/material";
import styled from 'styled-components';
import styles from './index.module.css';

const StyledFileUpload = styled.div`
  .anticon.anticon-upload {
    display: none;
  }
  .ant-btn > .anticon + span {
    margin-left: 0;
  }

  .ant-btn.ant-btn-default {
    background-color: #f4f4f4;
  }

  .ant-upload-list-text .ant-upload-list-item-name {
    max-width: 88%;
    text-overflow: 
  }
`

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const FileUpload = () => {
  return <div>
    <Box component="div" className={`${styles['file-upload-wrapper']}`}>
      <Grid container style={{
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Grid item>
          <StyledFileUpload>
            <Upload {...props} >
              <Button icon={<UploadOutlined />}>
                Select file...
              </Button >
            </Upload>
          </StyledFileUpload>
        </Grid>
        <Grid item>
          Drop file here to select
        </Grid>
      </Grid>
    </Box>
  </div>
};

export default FileUpload;