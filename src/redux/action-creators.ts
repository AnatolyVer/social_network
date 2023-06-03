import {Actions} from './action-types'

export const switchTheme = (data: string) => {
    return  {
        type: Actions.SWITCH_THEME,
        payload: data
    }
}