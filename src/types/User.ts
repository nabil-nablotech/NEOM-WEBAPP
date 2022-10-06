export type UserDetails = {
  jwt: string;
  user: User;
};

export type User = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  id: number;
  provider: string;
  updatedAt: Date;
};

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
