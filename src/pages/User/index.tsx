/* eslint-disable react-hooks/exhaustive-deps */
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, TableProps, Input, Button, Modal, Form, Spin, Tooltip, message } from 'antd';
import { PlusOneOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import axiosClient from '../../utils/services/axiosClient';
import { useDispatch } from 'react-redux';

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 10px 15px;
    overflow: auto;
    max-height: 400px;
  }
  .ant-form-item {
    margin-bottom: 7.5px;
  }
  .ant-form-item-label {
    padding: 0 0 4px;
  }
`;

const error = (error: any) => {
  message.error({
    content: error.toString() || 'Something went wrong!',
  });
};
const { Column } = Table;

const StyledTable = styled(Table)`
  th,
  .cellnowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-table-fixed {
    table-layout: fixed;
  }

  .ant-table-tbody > tr > td {
    word-wrap: break-word;
    word-break: break-all;
    min-width: 125px;
  }
`;

export interface IModalstate {
  visible: boolean;
   editing: any | null
}

const UserTable = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [modalState, setModalState] = useState<IModalstate>({ visible: false, editing: null });
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = (editing: any) => {
    form.setFieldsValue(
      editing || {
        description: null,
        name: null,
        value: null,
      }
    );
    setModalState({ visible: true, editing: editing });
  };

  const getLOVs = async () => {
    try {
      
      setModalState({ visible: false, editing: null });
      setConfirmLoading(false);
      setLoading(false);
    } catch (e) {
      // console.log(e);
      error('Failed to get lov.');
      setLoading(false);
      // setData([]);
      setModalState({ visible: false, editing: null });
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    getLOVs();
  }, []);

  const saveLOV = async (values: any) => {
    const data = {
      ...values,
    };
    try {
      
    } catch (e) {
      // console.log(e);
      error('Failed to save.');
      setModalState({ visible: true, editing: null });
      setConfirmLoading(false);
    }
  };

  const addLOV = async (values: any) => {
    const data = {
      ...values,
    };
    try {
      const response = await axiosClient({
        url: `lov`,
        method: 'post',
        data: data,
      });
      if (response) {
        getLOVs();
      }
    } catch (e) {
      // console.log(e);
      error('Failed to create.');
      setModalState({ visible: true, editing: null });
      setConfirmLoading(false);
    }
  };

  const handleOk = async (values: any) => {
    form.setFieldsValue({
      description: null,
      name: null,
      value: null,
    });
    const body = {
      ...values,
    };
    setConfirmLoading(true);
    if (modalState.editing) saveLOV(body);
    else addLOV(body);
  };

  const handleCancel = () => {
    form.setFieldsValue({
      description: null,
      name: null,
      value: null,
    });
    setModalState({ visible: false, editing: null });
  };

  const handleRemove = async (code: number) => {
    try {
    } catch(error: any) {

    }
  };

  const dataToDisplay = data ? data?.filter((el: any) => {
    return el.name?.toLowerCase()?.includes(search?.toLowerCase());
  }) : [];

  return (
    <>
      {modalState.visible && (
        <StyledModal
          // size="small"
          centered
          title={modalState.editing ? 'Edit User' : 'Add User'}
          visible={modalState.visible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                // console.log(values);
                handleOk(values);
              })
              .catch((info) => {
                // console.log(info);
              });
          }}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Spin spinning={confirmLoading}>
            <Form
              initialValues={modalState.editing}
              form={form}
              layout="vertical"
              name="form_in_modal"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input Name' }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="value"
                label="Value"
                rules={[{ required: true, message: 'Please input Value' }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input Description' }]}
              >
                <Input allowClear />
              </Form.Item>
            </Form>
          </Spin>
        </StyledModal>
      )}
      <div className="topBar">
        <Button type="primary" icon={<PlusOneOutlined />} onClick={() => showModal(null)}>
          Add List of Value
        </Button>
        <Input
          autoFocus
          allowClear
          placeholder="Search"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </div>
      <StyledTable
        rowKey={'_id'}
        size="small"
        dataSource={dataToDisplay}
        pagination={false}
        loading={loading ? loading : false}
        bordered
        scroll={{ x: true, y: 300 }}
      >
        <Column
          width={100}
          title="Name"
          dataIndex="name"
          key="name"
          render={(name, record) => <div className="tableCell cellnowrap">{name}</div>}
        />
        <Column
          width={120}
          title="Description"
          dataIndex="description"
          key="description"
          render={(description, record) => (
            <div className="tableCell cellnowrap">{description}</div>
          )}
        />
        <Column
          width={120}
          title="Value"
          dataIndex="value"
          key="value"
          render={(value, record) => <div className="tableCell cellnowrap">{value}</div>}
        />
        <Column
          width={90}
          title=""
          dataIndex=""
          key="actions"
          render={(_id, record) => (
            <div className="cellnowrap">
              <Tooltip placement="top" title="Edit List of Value">
                <Button
                  onClick={() => showModal(record)}
                  type="link"
                  icon={<EditOutlined style={{ padding: '4px' }} />}
                  size="small"
                />
              </Tooltip>
              <Tooltip placement="top" title="Delete List of Value">
                <Button
                  onClick={() => handleRemove(1)}
                  type="link"
                  icon={<DeleteOutlined style={{ padding: '4px', color: 'red' }} />}
                  size="small"
                />
              </Tooltip>
            </div>
          )}
        />
      </StyledTable>
    </>
  );
};

export default UserTable;
