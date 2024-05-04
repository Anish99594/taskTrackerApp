import { User } from "src/user/user.entity";

export type UserResponseType = Omit<User, 'password'> & {token: string}