import React from 'react';
import {EffectButton, MoonIcon, SunIcon} from "@Icons/*";
import {switchTheme} from "@redux/action-creators";
import {useDispatch} from "react-redux";

const ThemeSwitcher = ({theme}:{theme:string}) => {

    const dispatch = useDispatch()

    const style = {color: "white"}

    const swapTheme = () => {
        if (localStorage.getItem("theme") === "light") dispatch(switchTheme("dark"))
        else dispatch(switchTheme("light"))
    }

    const switcher = theme === "light" ? <MoonIcon sx={style}/> : <SunIcon sx={style}/>

    return (
        <EffectButton sx={style} onClick = {swapTheme}>
            {switcher}
        </EffectButton>
    );
};

export default ThemeSwitcher;