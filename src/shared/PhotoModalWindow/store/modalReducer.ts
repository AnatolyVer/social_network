import { Actions } from "../../../redux/action-types";
import IModal from "../../TypesAndInterfaces/IModal";

const defaultModal:IModal = {
    isOpen: false,
    image: undefined
}

export const modalReducer = (state = defaultModal, action: any) => {
    switch (action.type){
        case Actions.SET_MODAL_OPEN:
            return action.payload
        default:
            return state
    }
}
