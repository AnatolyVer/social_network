export interface Error{
    status: boolean,
    border:boolean,
    text: string,
}

export interface Errors{
    username:Error,
    nickname:Error,
    email:Error,
    password:Error,
    birth_date:Error
}