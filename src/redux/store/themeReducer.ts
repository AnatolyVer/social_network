import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";

const defaultTheme = "light"

export const themeReducer = (state = defaultTheme, action: IAction) => {
    switch (action.type){
        case Actions.SWITCH_THEME:
            return action.payload
        default:
            return state
    }
}
