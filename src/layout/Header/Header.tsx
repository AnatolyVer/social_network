import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {State} from "../../redux/store";
import {switchTheme} from "../../redux/action-creators";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import classes from './styles.module.scss';

interface HeaderProps{
    auth:boolean
}

function Header({auth}:HeaderProps) {
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const theme:string = useSelector((state:State) => state.theme)

    useEffect(() => {
        if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "light")
        dispatch(switchTheme(localStorage.getItem("theme") || 'light'))
    }, [])

    const swapTheme = () => {
        if (localStorage.getItem("theme") === "light") dispatch(switchTheme("dark"))
        else dispatch(switchTheme("light"))
    }
    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

    const style = {height: "30px", width:"30px", color: "white"}

    const switcher = theme === "light" ? <BedtimeIcon sx={style}/> : <LightModeIcon sx={style}/>

    return (
        <header className={`${classes.Header} ${theme}Header`}>
            <div className={classes.Content}>
                <nav>
                    {auth ? (
                        <>
                        <button className={classes.header_button}>Профіль</button>
                        <button className={classes.header_button}>Стрічка</button>
                        <button className={classes.header_button}>Друзі</button>
                        </>
                    ) : (
                    <button className={classes.header_button}>Увійти / Зареєструватися</button>
                    )}
                </nav>
                <nav>
                    {auth ? (
                        <div className={classes.add_button}>
                        <AddCircleIcon sx={style}/>
                        <button className={classes.header_button}>Додати пост</button>
                        </div>
                    ) : (
                        <></>
                    )
                    }
                    <div className={classes.header_input}>
                        <SearchIcon sx={style} />
                        <input placeholder="Пошук" value={search} onChange={changeSearch}/>

                    </div>
                    <IconButton sx={style} onClick = {swapTheme}>
                        {switcher}
                    </IconButton>
                </nav>
            </div>
        </header>
    );
}

export default Header;
