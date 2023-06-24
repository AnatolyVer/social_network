import {put, takeLatest, } from 'redux-saga/effects';
import {Actions} from '../action-types'

import * as Effects from "redux-saga/effects";
import IAction from "../../interfaces/IAction";
import {getProfileInfo, signIn, signUp} from "./API/user";
import Cookies from 'js-cookie';
import {clearFetch, setFetch, setProfileInfo} from "../action-creators";

const call: any = Effects.call;

function* SignInWorker(action: IAction){
    try {
        yield put(setFetch({text: 'Loading', status: 999}))
        const {data, headers, status} = yield call(signIn, action.payload);
        if (status === 200) {
            localStorage.setItem('access-token', data.access_token)
            localStorage.setItem('nickname', data.nickname)
            const refreshToken = headers['refresh-token'];
            Cookies.set('refreshToken', refreshToken, {
                secure: false,
                httpOnly: false,
            });
            localStorage.setItem('logged', 'true')
            yield put(clearFetch())
            action.nav!(`/profile/${data.nickname}`)
        }

    }catch (error) {
        yield put(setFetch({text: 'Не вдалося авторизуватися', status: 404}))
    }
}

function* SignUpWorker(action: IAction) {
    try {
        yield put(setFetch({ text: 'Loading', status: 999 }))
        const formData = new FormData();
        if (action.payload.account_photo) formData.append('account_photo', action.payload['account_photo'])
        for (const key in action.payload) {
            if (key != 'account_photo') formData.append(key, action.payload[key]);
        }
        const {data, headers, status} = yield call(signUp, formData);
        if (status === 200) {
            localStorage.setItem('access-token', data.access_token)
            localStorage.setItem('nickname', data.nickname)
            const refreshToken = headers['refresh-token'];
            Cookies.remove('refreshToken')
            Cookies.set('refreshToken', refreshToken, {
                secure: false,
                httpOnly: false,
            });
            localStorage.setItem('logged', 'true')
            yield put(clearFetch())
            action.nav!(`/profile/${data.nickname}`)
        }

        yield put(clearFetch());
    } catch (error) {
        yield put(setFetch({ text: 'Не вдалося створити акаунт', status: 404 }));
        console.log(error);
    }
}


function* getProfileInfoWorker(action: IAction){
    try {
        yield put(setFetch({ text: 'Loading', status: 999 }));
        const {data} = yield call(getProfileInfo, action.payload);
        yield put(setProfileInfo(data.data))
        yield put(setFetch({ text: 'Done', status: 200 }));
    }catch (error) {
        console.log(error)
        yield put(setFetch({ text: '', status: 404 }));
    }
}

export default function* userWatcher() {
    yield takeLatest(Actions.LOG_USER_API, SignInWorker)
    yield takeLatest(Actions.REG_USER_API, SignUpWorker)
    yield takeLatest(Actions.GET_USER_API, getProfileInfoWorker)
}
