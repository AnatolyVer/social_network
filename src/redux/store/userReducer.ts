import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";
import {IProfileInfo} from "../../shared/TypesAndInterfaces/IProfileInfo";

const defaultUser : IProfileInfo | null  = null

export const userReducer = (state = defaultUser, action: IAction) => {
    switch (action.type){
        case Actions.SET_CURRENT_PROFILE:
            return action.payload
        case Actions.CLEAR_CURRENT_PROFILE:
            return defaultUser
        default:
            return state
    }
}
