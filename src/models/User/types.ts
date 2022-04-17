export interface ICreateUserDTO {
  name: string;
  surname: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role: number;
}

export interface IUser extends ICreateUserDTO {
  _id: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}
