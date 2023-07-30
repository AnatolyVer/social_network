import {Actions} from "../action-types";
import IAction from "@shared/TypesAndInterfaces/IAction";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";

const defaultFetch:IFetch = {
    loading: false,
    text: "",
    status:0
}

export const fetchReducer = (state = defaultFetch, action: IAction) => {
    switch (action.type){
        case Actions.SET_FETCH:
            return {...state, ...action.payload}
        case Actions.CLEAR_FETCH:
            return defaultFetch
        default:
            return state
    }
}
