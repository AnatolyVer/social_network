import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";
import {IProfileInfo} from "../../shared/TypesAndInterfaces/IProfileInfo";

const defaultProfile : IProfileInfo | null  = null

export const profileReducer = (state = defaultProfile, action: IAction) => {
    switch (action.type){
        case Actions.SET_PROFILE:
            return action.payload
        case Actions.CLEAR_PROFILE:
            return defaultProfile
        default:
            return state
    }
}
