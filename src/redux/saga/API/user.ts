import axios, {Axios} from 'axios';

const REACT_APP_DEPLOY_URL = `https://django-auth-gfm6.onrender.com/api/`

export const signIn = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + 'account/login/',
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data,
    });
}

export const signUp = (data: FormData):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + 'account/register/',
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
    });
}


export const getProfileInfo = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/${data}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export const checkNickname = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/check_nickname/${data}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const checkEmail = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/check_email/${data}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}