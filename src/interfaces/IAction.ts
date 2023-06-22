import {NavigateFunction} from "react-router-dom";

export default interface IAction{
    type: string,
    payload: any,
    nav?: NavigateFunction
}

