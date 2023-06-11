import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {State} from "../../redux/store";
import {switchTheme} from "../../redux/action-creators";



import classes from './styles.module.scss';
import {AddIcon, EffectButton, MoonIcon, SearchIcon, SunIcon} from "../../shared/Icons";

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

    const switcher = theme === "light" ? <MoonIcon sx={style}/> : <SunIcon sx={style}/>

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
                            <AddIcon sx={style}/>
                            <button>Додати пост</button>
                        </div>
                    ) : (
                        <></>
                    )
                    }
                    <div className={classes.header_input}>
                        <SearchIcon sx={style} />
                        <input placeholder="Пошук" value={search} onChange={changeSearch}/>

                    </div>
                    <EffectButton sx={style} onClick = {swapTheme}>
                        {switcher}
                    </EffectButton>
                </nav>
            </div>
        </header>
    );
}

export default Header;
