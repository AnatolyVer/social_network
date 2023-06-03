import axios, {Axios} from 'axios';

import 'react-dotenv'

export const signIn = (data: string):Promise<Axios> =>{
    return axios({
        url: process.env.BACKEND_URL + '/account/login/',
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data,
    });
}