/* eslint-disable react-hooks/exhaustive-deps */
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Modal, Form, Spin, Tooltip, message } from 'antd';
import axiosClient from '../../utils/services/axiosClient';
import { useDispatch } from 'react-redux';
import Button from "../../components/Button";

import styles from './index.module.css'
import CustomSearchField from './../SearchField/index';
import { format } from 'date-fns'
import type { ColumnsType } from 'antd/es/table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuList from './../MenuList/index';
import { useMediaQuery } from 'react-responsive'

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

  .ant-table {
    font-family: 'Roboto-Regular';
    margin-block: 50px
  }

  .ant-table-thead > tr > th,
  .ant-table {
    background: transparent;
  }

  .ant-table-thead > tr > th {
    border: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > td {
    border: none
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    border: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table {
    border: none
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td {
    border-bottom: 1px solid var(--user-table-border);
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table th {
    color: var(--grey-text);
  }
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table td {
    color: var(--table-black-text);
  }

  .ant-table-tbody > tr > td {
    word-wrap: break-word;
    word-break: break-all;
    min-width: 125px;
  } 

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td.more-icon {
    border-left: 1px solid var(--user-table-border);
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td.more-icon .cellnowrap {
    width: fit-content;
  }

  td.ant-table-cell-row-hover {
    background: var(--user-table-cell-hover-bg) !important;
  }
`;

export interface IModalstate {
  visible: boolean;
  editing: any | null
}

const UserManagementTable = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [modalState, setModalState] = useState<IModalstate>({ visible: false, editing: null });
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1025px)' })

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
    } catch (error: any) {

    }
  };

  const dataToDisplay = data ? data?.filter((el: any) => {
    return el.name?.toLowerCase()?.includes(search?.toLowerCase());
  }) : [];


  const tableDataJson = [
    {
      key: '1',
      lastname: 'Zhor',
      firstname: 'Brown',
      email: 's.l@mm.com',
      role: 'Dev',
      lastlogin: format(new Date(), 'yyyy-MM-dd'),
      status: 'Active'
    },
    {
      key: '2',
      lastname: 'Yoshido',
      firstname: 'Dan',
      email: 's.sas@mm.com',
      role: 'Dev',
      lastlogin: format(new Date(), 'yyyy-MM-dd'),
      status: 'Inactive'
    },
    {
      key: '3',
      lastname: 'Brown',
      firstname: 'Alan',
      email: 'f.lsed@mm.com',
      role: 'Tester',
      lastlogin: format(new Date(), 'yyyy-MM-dd'),
      status: 'Active'
    },
    {
      key: '4',
      lastname: 'Cd',
      firstname: 'serr',
      email: 'ds.lsed@mm.com',
      role: 'Tester',
      lastlogin: format(new Date(), 'yyyy-MM-dd'),
      status: 'Active'
    },
    {
      key: '5',
      lastname: 'UIy',
      firstname: 'figh',
      email: 'sky.sky@mm.com',
      role: 'Dev',
      lastlogin: format(new Date(), 'yyyy-MM-dd'),
      status: 'Active'
    },
  ]

  let viewWidths = [
    '15vw',
    '15vw',
    '18vw',
    '15vw',
    '15vw',
    '20vw',
    '1vw',
  ]

  if (isTabletOrMobile) {

  }


  const tableHeaderJson: ColumnsType<any> = [
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      width: viewWidths[2]
    },
    {
      title: 'Role Assigned',
      dataIndex: 'role',
    },
    {
      title: 'Last Login',
      dataIndex: 'lastlogin',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        // To-do
        // <MoreOptionsComponent id = {record}/>

        <div>Edit</div>
      ),
    }
  ]

  const [activeMenu, setActiveMenu] = useState(null)


  const MoreOptionsComponent = (record?:any) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return <>
      <div className="" onClick={e => {
        console.log('hex: ', record)

        if(menuOpen) setMenuOpen(false)
          setMenuOpen(true)
          setActiveMenu(record.id.key)
      }}
      
      style={{
        position: 'relative'
      }}>
        <MoreHorizIcon />
      </div>
      <MenuList
        menuOpen={menuOpen}
        menuItemsArray={[
          {
            label: "Edit",
            handleClickMenuItem: () => {
            },
          }
        ]}
      />
    </>
  }

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
        <Button label="SIGN IN" />
        <CustomSearchField />

      </div>
      <StyledTable
        className={`${styles['table-container']}`}
        rowKey={'_id'}
        size="small"
        columns={tableHeaderJson}
        dataSource={tableDataJson}
        pagination={false}
        loading={loading ? loading : false}
        bordered
        scroll={{ x: true, y: 300 }}
        style={{
          background: 'transparent'
        }}
      >
      </StyledTable>
    </>
  );
};

export default UserManagementTable;
