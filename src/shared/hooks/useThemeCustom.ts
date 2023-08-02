import {useEffect} from 'react';
import {switchTheme} from "@redux/action-creators";
import {useDispatch} from "react-redux";

const useThemeCustom = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "light")
        dispatch(switchTheme(localStorage.getItem("theme") || 'light'))
    }, []);

    const changeTheme = () =>{
        if (localStorage.getItem("theme") === "light") dispatch(switchTheme("dark"))
        else dispatch(switchTheme("light"))
    }
    return changeTheme
};

export default useThemeCustom;