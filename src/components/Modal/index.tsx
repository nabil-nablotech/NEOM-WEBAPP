import React, { useState } from "react";
import styles from "./index.module.css";
import styled from "styled-components";
import { Modal, Form, Spin, Tooltip, message } from "antd";
import { User, UserModalstate } from "../../types/User";
import {
  AddUserFormErrors,
  AddUserState,
  ModalComponentProps,
} from "../../types/ModalComponent";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import DropdownComponent from "../Dropdown";
import { SelectChangeEvent } from "@mui/material/Select";
import { UseMutateFunction } from "react-query";

const StyledModal = styled(Modal)`
  .ant-modal {
    width: 100ch;
  }
  .ant-modal-wrap {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .ant-modal-title {
    font-size: 35px;
    line-height: 1;
  }
  .ant-modal-header,
  .ant-modal-body,
  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-header {
    border-bottom: none;
    margin-bottom: 1em;
  }

  .ant-modal-content {
    padding: 1.5em 2em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    width: 49ch;
    margin-inline: auto;
  }

  .ant-modal-close-x {
    display: flex;
    justify-content: start;
    align-items: end;
  }

  .ant-modal-body {
    overflow: auto;
    max-height: 400px;
    padding-block: 1em;
  }
  .ant-form-item {
    margin-bottom: 7.5px;
  }
  .ant-form-item-label {
    padding: 0 0 4px;
  }
  .ant-modal-footer {
    border-top: none;
  }
  .ant-form legend {
    width: inherit;
  }
`;
export interface IUser {
  data: User[] | [];
  postUser: UseMutateFunction;
  editUser: UseMutateFunction;
  isLoading: boolean;
  handleUser: (payload: User | null) => void;
  userData: User | null;
  setConfirmLoading: (e: boolean) => void;
  confirmLoading: boolean;
  updatedUser?: User;
  setModalState: (e: UserModalstate) => void;
  modalState: UserModalstate;
}

const Footer = ({ modalState }: { modalState: UserModalstate }) => {
  return (
    <div className={`${styles["modal-footer"]}`}>
      <Button
        colors={["#fff", "var(--table-black-text)", "none"]}
        className={`${styles["plain-whitee-btn"]}`}
        label="Cancel"
        onClick={() => {}}
      />
      <Button
        label={modalState.editing ? "UPDATE" : "ADD"}
        onClick={() => {}}
      />
    </div>
  );
};
const ModalComponent = ({
  setModalState,
  modalState,
  confirmLoading,
  handleOk,
  handleCancel,
}: ModalComponentProps & Partial<IUser>) => {
  const roleDataList = [
    {
      label: "Admin",
      value: "ADMIN",
    },
    {
      label: "User",
      value: "USER",
    },
  ];

  const [form] = Form.useForm();
  // const [formErrors, setFormErrors] = useState<AddUserFormErrors>({
  //     firstname: {
  //         show: false,
  //         message: "",
  //     },
  //     lastname: {
  //         show: false,
  //         message: "",
  //     },
  //     email: {
  //         show: false,
  //         message: "",
  //     },
  //     role: {
  //         show: false,
  //         message: "",
  //     },
  // });

  const [state, setState] = useState<AddUserState>({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    status: 'active'
  });

  const handleChange = (
    e: SelectChangeEvent<string>,
    name: "firstname" | "lastname" | "email" | "role"
  ) => {
    console.log("hex", e);
    setState((state) => ({
      ...state,
      role: e.target.value,
    }));
  };

  return (
    <>
      {modalState.visible && (
        <div className={`${styles["container-div"]}`}>
          <StyledModal
            centered
            className={`${styles["container"]}`}
            title={modalState.editing ? "Edit User" : "Add User"}
            open={modalState.visible}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  handleOk(values);
                })
                .catch((info) => {
                  // console.log(info);
                });
            }}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            closeIcon={
              <ClearSharpIcon sx={{ width: "1.7em", height: "1.7em" }} />
            }
            footer={[<Footer modalState={modalState} />]}
          >
            <Spin spinning={confirmLoading}>
              <Form
                initialValues={modalState.editing || undefined}
                form={form}
                layout="vertical"
                name="form_in_modal"
              >
                <TextInput
                  className={`${styles["input-field"]} ${styles["firstname"]}`}
                  label="First Name"
                  name="firstName"
                  value={state.firstname}
                  // error={formErrors.firstname.message ? true : false}
                  // errorText={formErrors.firstname.message}
                  onChange={(e) => handleChange(e, "firstname")}
                  // onBlur={() => validateCredentials('email')}
                  required
                />
                <TextInput
                  className={`${styles["input-field"]} ${styles["lastname"]}`}
                  label="Last Name"
                  name="lastName"
                  value={state.lastname}
                  onChange={(e) => handleChange(e, "lastname")}
                />
                <TextInput
                  className={`${styles["input-field"]} ${styles["email"]}`}
                  label="Email"
                  name="email"
                  value={state.email}
                  onChange={(e) => handleChange(e, "email")}
                />
                {/* <TextInput
                                    className={`${styles['input-field']} ${styles['role']}`}
                                    label="Role"
                                    value={state.role}
                                    onChange={(e) => handleChange(e, "role")}
                                /> */}
                {/* <StyledDropdown /> */}
                <DropdownComponent
                  className={`WEDR ${styles["role-dropdown"]}`}
                  label={"Role"}
                  name="role"
                  value={state.role}
                  handleChange={(e) => handleChange(e, "role")}
                  itemsList={roleDataList}
                />
              </Form>
            </Spin>
            {!modalState.editing && (
              <div className={`${styles["disclaimer"]}`}>
                Once the new user is added, the access link will be created so
                it can be shared with the new user.
              </div>
            )}
          </StyledModal>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
