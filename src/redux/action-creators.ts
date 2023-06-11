import {Actions} from './action-types'

export const switchTheme = (data: string) => {
    return  {
        type: Actions.SWITCH_THEME,
        payload: data
    }
}

export const setModalOpen = (data: boolean, image? : string) => {
    return  {
        type: Actions.SET_MODAL_OPEN,
        payload: {isOpen: data, image: image}
    }
}