import {Actions} from './action-types'

export const switchTheme = (data: string) => {
    return  {
        type: Actions.SWITCH_THEME,
        payload: data
    }
}

export const setModalOpen = (isOpen: boolean, images? : [string], num?: number, image?:string) => {
    console.log(image)
    return  {
        type: Actions.SET_MODAL_OPEN,
        payload: {isOpen, images, num, image}
    }
}

export const changeModalNum = (num: number) => {
    return  {
        type: Actions.CHANGE_MODAL_NUM,
        payload: num
    }
}