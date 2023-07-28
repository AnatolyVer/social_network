export interface InputError{
    status: boolean,
    border:boolean,
    text: string,
}
export interface InputErrors{
    username:InputError,
    nickname:InputError,
    email:InputError,
    password:InputError,
    birth_date:InputError
}