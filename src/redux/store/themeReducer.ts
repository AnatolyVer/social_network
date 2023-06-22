import {Actions} from "../action-types";
import IAction from "../../interfaces/IAction";

const defaultTheme  = "light"

export const themeReducer = (state = defaultTheme, action: IAction) => {
    switch (action.type){
        case Actions.SWITCH_THEME:
            localStorage.setItem("theme", action.payload)
            const color = action.payload === "light" ? '#EBEBEB' : '#333333'
            document.body.classList.add(action.payload === "light" ? 'light' : 'dark');
            document.body.style.backgroundColor = color;
            return action.payload
        default:
            return state
    }
}
