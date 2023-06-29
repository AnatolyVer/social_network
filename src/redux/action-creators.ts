import {IUser, ILogUser} from '../shared/TypesAndInterfaces/IUser'
import {Actions} from './action-types'
import {NavigateFunction} from "react-router-dom";
import {IProfileInfo} from "../shared/TypesAndInterfaces/IProfileInfo";
import {IFetch} from "../shared/TypesAndInterfaces/IFetch";

export const switchTheme = (data: string) => {
    return  {
        type: Actions.SWITCH_THEME,
        payload: data
    }
}

export const setModalOpen = (isOpen: boolean, images? : [string], num?: number, image?:string) => {
    return  {
        type: Actions.SET_MODAL_OPEN,
        payload: {isOpen, images, num, image}
    }
}

export const changeModalNum = (num: number) => {
    return  {
        type: Actions.CHANGE_MODAL_NUM,
        payload: num
    }
}

export const logUserAPI = (data: ILogUser, nav:NavigateFunction)  => {
    return{
        type: Actions.LOG_USER_API,
        payload: data,
        nav
    }
}

export const getProfileInfo = (data: string)  => {
    return{
        type: Actions.GET_USER_API,
        payload: data
    }
}

export const setProfileInfo = (data: IProfileInfo)  => {
    return{
        type: Actions.SET_PROFILE,
        payload: data
    }
}

export const setFetch = (data: IFetch)  => {
    return{
        type: Actions.SET_FETCH,
        payload: data
    }
}

export const clearFetch = ()  => {
    return{
        type: Actions.CLEAR_FETCH
    }
}

export const signUser = (data:IUser, account_photo: File, nav:NavigateFunction)  => {
    return{
        type: Actions.REG_USER_API,
        payload: {...data, account_photo},
        nav
    }
}

export const setSignNickname = (data:boolean)  => {
    return{
        type: Actions.SET_SIGN_NICKNAME,
        payload: data
    }
}

export const setSignEmail = (data: boolean)  => {
    return{
        type: Actions.SET_SIGN_EMAIL,
        payload: data
    }
}

export const checkSignNickname = (data:string)  => {
    return{
        type: Actions.CHECK_SIGN_NICKNAME,
        payload: data
    }
}

export const checkSignEmail = (data: string)  => {
    return{
        type: Actions.CHECK_SIGN_EMAIL,
        payload: data
    }
}


export const clearSign = ()  => {
    return{
        type: Actions.CLEAR_SIGN
    }
}

export const sendEmail = (data:string)  => {
    return{
        type: Actions.SEND_EMAIL,
        payload: data
    }
}

export const sendCode = (data:string, user:IUser, account_photo: File, nav:NavigateFunction)  => {
    return{
        type: Actions.SEND_CODE,
        payload: {data, user, account_photo, nav}
    }
}