import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";

const defaultFetch = {
    text: "",
    status:0
}

export const fetchReducer = (state = defaultFetch, action: IAction) => {
    switch (action.type){
        case Actions.SET_FETCH:
            return action.payload
        case Actions.CLEAR_FETCH:
            return defaultFetch
        default:
            return state
    }
}
