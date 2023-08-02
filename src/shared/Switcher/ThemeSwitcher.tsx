import React from 'react';
import {useSelector} from "react-redux";

import {State} from "@redux/store";
import useThemeCustom from "@shared/hooks/useThemeCustom";
import {EffectButton, MoonIcon, SunIcon} from "@Icons/*";

const ThemeSwitcher = () => {

    const theme:string = useSelector((state:State) => state.theme)
    const changeTheme = useThemeCustom()

    return (
        <EffectButton sx={{color: "white"}} onClick = {changeTheme}>
            {theme === "light" ? <MoonIcon sx={{color: "white"}}/> : <SunIcon sx={{color: "white"}}/>}
        </EffectButton>
    );
};

export default ThemeSwitcher;