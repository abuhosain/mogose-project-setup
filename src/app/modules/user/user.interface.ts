/* eslint-disable no-unused-vars */
import { Model } from "mongoose"
import { USER_ROLE } from "./user.constance"

export interface TUser {
  id: string;
  password: string;
  needsPassowordChange: boolean;
  passwordChangesAt? : Date;
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type TUserRole =  keyof typeof USER_ROLE;

export type TNewUser = {
  password: string
  role: string
  id: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id : string) : Promise<TUser>;
  isUserPasswordMatch(plainTextPassword  : string, hashedPassword  : string) : Promise<boolean>;
  isJwtIssuedBeforePasswordChanged(passwordChangedTimestamt : Date, jwtIssuedTimestamp : number): boolean;
}
  