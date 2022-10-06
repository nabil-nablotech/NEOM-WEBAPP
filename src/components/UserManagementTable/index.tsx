/* eslint-disable react-hooks/exhaustive-deps */
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Modal, Form, Spin, Tooltip, message } from 'antd';
import axiosClient from '../../utils/services/axiosClient';
import { useDispatch } from 'react-redux';
import Button from "../../components/Button";
import { User, UserPayload } from "../../types/User";

import styles from './index.module.css'
import CustomSearchField from './../SearchField/index';
import { UseMutationResult } from "react-query";

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

export interface IUser {
  data?: User[]
  postUser?: () => void
  editUser: any
  showModal: boolean
  setShowModal?: () => void
  handleUser: (payload: User) => void
  userData: User | null
}

export const UserManagementTable = (props: IUser) => {
  const {data, setShowModal, handleUser, editUser, userData} = props;
  const [search, setSearch] = useState<string>('');
  const [modalState, setModalState] = useState<IModalstate>({ visible: false, editing: null });
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = (editing: User) => {
    form.setFieldsValue(
      editing || {
        description: null,
        name: null,
        value: null,
      }
    );
    setModalState({ visible: true, editing: editing });
    handleUser(editing);
  };

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
  };

  const handleCancel = () => {
    form.setFieldsValue({
      description: null,
      name: null,
      value: null,
    });
    setModalState({ visible: false, editing: null });
  };

  const dataToDisplay = data ? data?.filter((el: User) => {
    return el.firstName?.toLowerCase()?.includes(search?.toLowerCase());
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
                editUser({...userData, ...values});
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
                name="firstName"
                label="Firstname"
                rules={[{ required: true, message: 'Please input firstname' }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Lastname"
                rules={[{ required: true, message: 'Please input lastname' }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input email' }]}
              >
                <Input allowClear />
              </Form.Item>
            </Form>
          </Spin>
        </StyledModal>
      )}
      <div className="topBar">
        <Button label="Add User" />
        <CustomSearchField />

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
          title="Firstname"
          dataIndex="firstName"
          key="firstName"
          render={(firstName, record) => <div className="tableCell cellnowrap">{firstName}</div>}
        />
        <Column
          width={120}
          title="Lastname"
          dataIndex="lastName"
          key="lastName"
          render={(value, record) => (
            <div className="tableCell cellnowrap">{value}</div>
          )}
        />
        <Column
          width={120}
          title="Email"
          dataIndex="email"
          key="email"
          render={(value, record) => <div className="tableCell cellnowrap">{value}</div>}
        />
        <Column
          width={90}
          title=""
          dataIndex=""
          key="actions"
          render={(_id, record: User) => (
            <div className="cellnowrap">
              <Tooltip placement="top" title="Edit List of Value">
                <Button label="show modal" onClick={() => showModal(record)} />
              </Tooltip>
            </div>
          )}
        />
      </StyledTable>
    </>
  );
};
