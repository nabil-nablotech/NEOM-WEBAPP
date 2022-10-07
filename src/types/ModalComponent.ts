import { IUser } from './../components/Modal/index';
import { UserModalstate } from './User';

export type ModalComponentProps = {

    setModalState: (e: UserModalstate) => void
    modalState: UserModalstate
    handleOk: (values: FormData) => void
    handleCancel: () => void
} & Partial<IUser>

export type AddUserState = {
    firstname: string
    lastname: string
    email: string
    role: string
    status: string
}

type AddUserFormError = {
    show: boolean;
    message: string;
};

export type AddUserFormErrors = {
    firstname: AddUserFormError;
    lastname: AddUserFormError;
    email: AddUserFormError;
    role: AddUserFormError;
    status: AddUserFormError;
};