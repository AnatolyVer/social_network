import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {State} from "../../redux/store";
import {switchTheme} from "../../redux/action-creators";



import classes from './styles.module.scss';
import {AddIcon, EffectButton, MoonIcon, SearchIcon, SunIcon} from "../../shared/Icons";
import {Link} from "react-router-dom";


function Header() {
    const [search, setSearch] = useState("")

    const auth = localStorage.getItem('logged') === 'true' ? true : false
    const dispatch = useDispatch()
    const nickname = localStorage.getItem('nickname')

    const theme:string = useSelector((state:State) => state.theme)

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
                            <Link to={`/profile/${nickname}`}>
                                <div className={classes.header_button}>Профіль</div>
                            </Link>
                        <button className={classes.header_button}>Стрічка</button>
                        <button className={classes.header_button}>Друзі</button>
                        </>
                    ) : (
                        <Link to="/sign_up">
                            <div className={`${classes.header_button}`}>
                                Увійти / Зареєструватися
                            </div>
                        </Link>
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
