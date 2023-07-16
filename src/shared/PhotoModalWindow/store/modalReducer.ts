import {Actions} from "../../../redux/action-types";
import IModal from "../../TypesAndInterfaces/IModal";

const defaultModal:IModal = {
    isOpen: false,
    images: undefined,
    num: undefined,
    image: undefined
}

export const modalReducer = (state = defaultModal, action: any) => {
    switch (action.type){
        case Actions.SET_MODAL_OPEN:
            return action.payload
        case Actions.CHANGE_MODAL_NUM:
            return {...state, num: action.payload, image: state.images?.at(action.payload)}
        default:
            return state
    }
}
