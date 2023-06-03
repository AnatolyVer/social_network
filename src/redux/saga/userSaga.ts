import { put, takeLatest, } from 'redux-saga/effects';
import {Actions} from '../action-types'


import * as to from '../action-creators'
import * as Effects from "redux-saga/effects";
import * as API from './API/user'
import IAction from "../../interfaces/IAction";

const call: any = Effects.call;



function* SignInWorker(action: IAction){
    try {


    }catch (error) {

    }
}

function* SignUpWorker(action: IAction){
    try {

    }catch (error) {

    }
}

function* GetUserWorker(action: IAction){
    try {

    }catch (error) {

    }
}

export default function* userWatcher() {
    yield takeLatest(Actions.LOG_USER_API, SignInWorker)

}
