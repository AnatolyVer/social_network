import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";

const defaultSign = {
    nickname:true,
    email:false
}

export const signReducer = (state = defaultSign, action: IAction) => {
    switch (action.type){
        case Actions.SET_SIGN_NICKNAME:
            return {...state, nickname: action.payload}
        case Actions.SET_SIGN_EMAIL:
            return {...state, email: action.payload}
        case Actions.CLEAR_SIGN:
            return defaultSign
        default:
            return state
    }
}
