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
  id: number;
  lastName: string;
  provider: string;
  updatedAt: Date;
  username: string;
};

export type LoginData = {
  data: {
    attributes: any;
  };
};

export type loginPayload = {
  identifier: string;
  password: string;
};
