import axios, {Axios, AxiosPromise} from 'axios';
import Cookies from "js-cookie";

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
export const sendEmail = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/send_email_code/`,
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    });
}

export const sendCode = (data: string):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/confirm_email/`,
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    });
}

export const edit = (data: any):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + 'account/edit/',
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            'refresh-token': Cookies.get('refreshToken')
        },
        data,
    });
}


export const createPost = (data: any):Promise<Axios> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `post/add/`,
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            'refresh-token': Cookies.get('refreshToken')
        },
        data,
    });
}

export const getPostsByID = (id: string):Promise<AxiosPromise> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `posts/${id}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const getPostBySlug = (slug: string):Promise<AxiosPromise> =>{
    return axios({
        url: REACT_APP_DEPLOY_URL + `post/${slug}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'

        },
    });
}

export const getProfileInfo = (data: string):Promise<AxiosPromise> => {
    return axios({
        url: REACT_APP_DEPLOY_URL + `account/${data}/`,
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'

        },
    });
}
