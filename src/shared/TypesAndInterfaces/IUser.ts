import {Dayjs} from "dayjs";

export interface IUser{
    username?:string,
    nickname?:string,
    email?:string,
    password?:string,
    confirmPassword?:string,
    birth_date?:Dayjs | unknown
}

export interface ILogUser{
    nickname_or_email:string,
    password:string
}