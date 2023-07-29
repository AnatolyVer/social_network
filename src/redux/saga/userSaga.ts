import {put, takeLatest, } from 'redux-saga/effects';
import {Actions} from '../action-types'

import * as Effects from "redux-saga/effects";
import IAction from "@shared/TypesAndInterfaces/IAction";
import {checkEmail, checkNickname, createPost, edit, getProfileInfo, sendCode, sendEmail, signIn, signUp} from "./API/user";
import Cookies from 'js-cookie';
import {
    clearFetch, editUser, getUserInfo,
    setFetch,
    setProfileInfo,
    setSignEmail,
    setSignNickname,
    setUserInfo,
    signUser
} from "../action-creators";

const call: any = Effects.call;

function* SignInWorker(action: IAction){
    try {
        yield put(setFetch({text: 'Loading', status: 999}))
        const {data, headers} = yield call(signIn, action.payload);
        console.log(data)
        localStorage.setItem('access-token', data.access_token)
        localStorage.setItem('nickname', data.nickname)
        localStorage.setItem('id', data.id)
        const refreshToken = headers['refresh-token'];
        Cookies.set('refreshToken', refreshToken, {
            secure: false,
            httpOnly: false,
        });
        localStorage.setItem('logged', 'true')
        yield call(getUserInfoWorker, getUserInfo(data.nickname));
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
            if (key !== 'account_photo') formData.append(key, action.payload[key]);
        }
        const {data, headers} = yield call(signUp, formData);
        localStorage.setItem('access-token', data.access_token)
        localStorage.setItem('nickname', data.nickname)
        localStorage.setItem('id', data.id)
        const refreshToken = headers['refresh-token'];
        Cookies.remove('refreshToken')
        Cookies.set('refreshToken', refreshToken, {
            secure: false,
            httpOnly: false,
        });
        localStorage.setItem('logged', 'true')
        try {
            yield call(getUserInfoWorker, getUserInfo(data.nickname));
        }catch (e){
            console.log(e)
        }
        action.nav!(`/profile/${data.nickname}`)
        yield put(clearFetch());
    } catch (error) {
        yield put(setFetch({ text: 'Не вдалося створити акаунт', status: 404 }));
        console.log(error);
    }
}

function* getUserInfoWorker(action: IAction){
    try {
        yield put(setFetch({ text: 'Loading', status: 999 }));
        const {data} = yield call(getProfileInfo, action.payload);
        yield put(setUserInfo(data.data || null))
        yield put(setFetch({ text: 'Done', status: 200 }));
    }catch (error) {
        console.log(error)
        yield put(setFetch({ text: '', status: 404 }));
    }
}


function* checkNicknameWorker(action: IAction){
    try {
        yield call(checkNickname, action.payload);
        yield put(setSignNickname(true))
    }catch (error) {
        console.log(error)
        yield put(setSignNickname(false))
    }
}

function* checkEmailWorker(action: IAction){
    try {
        yield call(checkEmail, action.payload);
        yield put(setSignEmail(true))
    }catch (error) {
        yield put(setSignEmail(false))
        console.log(error)
    }
}


function* sendEmailWorker(action: IAction){
    try {
        yield call(sendEmail, {email: action.payload});
    }catch (error) {
        console.log(error)
    }
}

function* sendCodeWorker(action: IAction){
    try {
         yield call(sendCode, {email: action.payload.user.email, code:action.payload.data});
         yield call(SignUpWorker, signUser(action.payload.user, action.payload.account_photo, action.payload.nav ));

    }catch (error) {
        yield put(setFetch({ text: 'Невірний код.', status: 404 }));
        console.log(error)
    }
}

function* EditUserWorker(action: IAction){
    try {
        const formData = new FormData();
        if (action.payload.account_photo) formData.append('account_photo', action.payload['account_photo'])
        if (action.payload.account_banner) formData.append('account_banner', action.payload['account_banner'])
        for (const key in action.payload) {
            if (key !== 'account_photo' && key !== 'account_banner') formData.append(key, action.payload[key]);
        }
        yield call(edit, formData);
        try {
            yield call(getUserInfoWorker, getUserInfo(action.payload.nickname));
            localStorage.setItem('nickname', action.payload.nickname)
        }catch (e){
            console.log(e)
        }
    }catch (error: any) {
        if (error.response.status === 401) {
            console.log('Refreshing access-token')
            localStorage.setItem('access-token', error.response.data.access_token)
            yield call(EditUserWorker, editUser(action.payload));
        }
    }
}

function* CreatePostWorker(action: IAction){
    try {
        yield put(setFetch({ text: 'Loading', status: 999 }));
        const formData = new FormData();
        for (const key in action.payload) {
            formData.append(key, action.payload[key]);
        }
        yield call(createPost, formData);
        yield put(setFetch({ text: 'Done', status: 200 }));

        action.nav!(`/profile/${localStorage.getItem('nickname')}`)
    }catch (error: any) {
        if (error.response.status === 401) {
            localStorage.setItem('access-token', error.response.data.access_token)
            yield call(CreatePostWorker, createPost(action.payload));
        }
    }
}


export default function* userWatcher() {
    yield takeLatest(Actions.LOG_USER_API, SignInWorker)
    yield takeLatest(Actions.REG_USER_API, SignUpWorker)
    yield takeLatest(Actions.GET_CURRENT_USER_API, getUserInfoWorker)
    yield takeLatest(Actions.CHECK_SIGN_NICKNAME, checkNicknameWorker)
    yield takeLatest(Actions.CHECK_SIGN_EMAIL, checkEmailWorker)
    yield takeLatest(Actions.SEND_EMAIL, sendEmailWorker)
    yield takeLatest(Actions.SEND_CODE, sendCodeWorker)
    yield takeLatest(Actions.EDIT_USER, EditUserWorker)
    yield takeLatest(Actions.CREATE_POST, CreatePostWorker)
}
