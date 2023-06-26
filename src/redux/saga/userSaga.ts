import {put, takeLatest, } from 'redux-saga/effects';
import {Actions} from '../action-types'

import * as Effects from "redux-saga/effects";
import IAction from "../../interfaces/IAction";
import {checkEmail, checkNickname, getProfileInfo, signIn, signUp} from "./API/user";
import Cookies from 'js-cookie';
import {clearFetch, setFetch, setProfileInfo, setSignEmail, setSignNickname} from "../action-creators";

const call: any = Effects.call;

function* SignInWorker(action: IAction){
    try {
        yield put(setFetch({text: 'Loading', status: 999}))
        const {data, headers} = yield call(signIn, action.payload);
        localStorage.setItem('access-token', data.access_token)
        localStorage.setItem('nickname', data.nickname)
        const refreshToken = headers['refresh-token'];
        Cookies.set('refreshToken', refreshToken, {
            secure: false,
            httpOnly: false,
        });
        console.log(`Hello, ${data.nickname}`)
        localStorage.setItem('logged', 'true')
        yield put(clearFetch())
        action.nav!(`/profile/${data.nickname}`)

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
        const {data, headers} = yield call(signUp, formData);
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

function* checkNicknameWorker(action: IAction){
    try {
        const {data} = yield call(checkNickname, action.payload);
        yield put(setSignNickname(true))
    }catch (error) {
        console.log(error)
        yield put(setSignNickname(false))
    }
}

function* checkEmailWorker(action: IAction){
    try {
        const {data} = yield call(checkEmail, action.payload);
        yield put(setSignEmail(true))
    }catch (error) {
        yield put(setSignEmail(false))
        console.log(error)
    }
}


export default function* userWatcher() {
    yield takeLatest(Actions.LOG_USER_API, SignInWorker)
    yield takeLatest(Actions.REG_USER_API, SignUpWorker)
    yield takeLatest(Actions.GET_USER_API, getProfileInfoWorker)
    yield takeLatest(Actions.CHECK_SIGN_NICKNAME, checkNicknameWorker)
    yield takeLatest(Actions.CHECK_SIGN_EMAIL, checkEmailWorker)
}
