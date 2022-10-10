export type UserDetails = {
  jwt: string;
  user: User;
};

export type User = {
  blocked: boolean | string;
  confirmed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  id: number;
  provider: string;
  updatedAt: Date;
  role: Role
};

export type Role = {
  createdAt: Date
  description: string
  id: number
  name: string
  type: string
  updatedAt: Date
  label?: string
  value?: string | number
}

export type UserPayload = {
  email: string;
  firstName: string;
  role: string;
  lastName: string;
}

export type LoginData = {
  data: {
    attributes: any;
  };
};

export type loginPayload = {
  identifier: string;
  password: string;
};

export interface UserModalstate {
  visible: boolean;
  editing: User | null
}
export interface ISnackbar {
  open: boolean
  message: string
}

export type Roles = {
  roles: Role[]
}

