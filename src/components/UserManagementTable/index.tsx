/* eslint-disable react-hooks/exhaustive-deps */
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Modal, Form, Spin, Tooltip, message } from 'antd';
import axiosClient from '../../utils/services/axiosClient';
import { AnyIfEmpty, useDispatch } from 'react-redux';
import Button from "../../components/Button";
import { User, UserPayload } from "../../types/User";

import styles from './index.module.css'
import CustomSearchField from './../SearchField/index';
import { UseMutationResult } from "react-query";
import { format } from 'date-fns'
import type { ColumnsType } from 'antd/es/table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { useMediaQuery } from 'react-responsive'
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DataArray, SingleObj } from "../../types/UserManagement";

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

const tableDataJson:DataArray = [
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
  {
    key: '6',
    lastname: 'sas',
    firstname: 'hghg',
    email: 'sky.sky@mm.com',
    role: 'Dev',
    lastlogin: format(new Date(), 'yyyy-MM-dd'),
    status: 'Active'
  },
  {
    key: '7',
    lastname: 'wee',
    firstname: 'hf',
    email: 'sky.sky@mm.com',
    role: 'Dev',
    lastlogin: format(new Date(), 'yyyy-MM-dd'),
    status: 'Active'
  },
  {
    key: '8',
    lastname: 'Sam',
    firstname: 'Ticker',
    email: 'sky.sky@mm.com',
    role: 'Dev',
    lastlogin: format(new Date(), 'yyyy-MM-dd'),
    status: 'Active'
  },
]
export interface IUser {
  data: User[] | []
  postUser?: () => void
  editUser: any
  isLoading: boolean
  handleUser: (payload: User | null) => void
  userData: User | null
}

export const UserManagementTable = (props: IUser) => {
  const {data, handleUser, editUser, userData, isLoading: loading} = props;
  const [search, setSearch] = useState<string>('');
  const [dataList, setDataList] = useState<User[] | []>([]);
  const [modalState, setModalState] = useState<IModalstate>({ visible: false, editing: null });
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1025px)' })
  
  useEffect(() => {
    setDataList(data);
  }, [data])

  const showModal = (editing: User | null) => {
    form.setFieldsValue(
      editing || {
        firstName: null,
        lastName: null,
        email: null,
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
      firstName: null,
      lastName: null,
      email: null,
    });
    const body = {
      ...values,
    };
    setConfirmLoading(true);
    if (modalState.editing) editUser({...userData, ...values});
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


  
  let viewWidths = [
    '15vw',
    '15vw',
    '18vw',
    '15vw',
    '15vw',
    '20vw',
    '1vw',
  ]

  const tableHeaderJson: ColumnsType<any> = [
    {
      title: 'Last Name',
      key: 'lastName',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: 'First Name',
      key: 'firstName',
      dataIndex: 'firstName',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      width: viewWidths[2]
    },
    {
      title: 'Role Assigned',
      dataIndex: 'role',
      key: 'role',
      render: (value, index) => value.name
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
      render: (value, record: User) => (
        <MoreOptionsComponent id={record.id} record={record} />

      ),
    }
  ]


  const MoreOptionsComponent = ({record, id}: {id: number, record: User}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    return <>
      <div className="" onClick={e => {
        handleClick(e)
      }}

        style={{
          position: 'relative',
          cursor: 'pointer'
        }}>
        <MoreHorizIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => showModal(record)}>Edit</MenuItem>
      </Menu>
    </>
  }

  const filterResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.length > 0) {

  
      let newDatalist = [...data]

    /** filter when search string is not empty */
    if (e.target.value !== '') {

      newDatalist = dataList ? dataList.filter(obj => {
        let flag = false

        Object.keys(obj).forEach(key => {

          /** if any string out of each column item matches, return result */
          if (
            (obj[key as keyof User]
              .toString()
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) !== -1)
          ) {
            flag = true
          }
        })

        return flag
      }) : []

    }

    setDataList(newDatalist);
  }
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
                handleOk(values)
              })
              .catch((info) => {
                // console.log(info);
              });
          }}
          confirmLoading={confirmLoading}
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
      <div className={`${styles['add-user-btn']}`}>
        <Button label="USER" onClick={() => showModal(null)} StartIcon={AddIcon}/>
      </div>
      <div className={`${styles['custom-search']}`}>
        <CustomSearchField className={`${styles['custom-search-field']}`}
          handleChange={e => {
            filterResults(e)
          }}
        />
      </div>
      <StyledTable
        className={`${styles['table-container']}`}
        rowKey={'_id'}
        size="small"
        columns={tableHeaderJson}
        dataSource={dataList}
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
