import React from 'react';
import classes from "./styles.module.scss";
import {Link} from "react-router-dom";
import {SearchIcon} from "../../shared/Icons";
import ThemeSwitcher from "../../shared/Switcher/ThemeSwitcher";

interface HeaderProps{
    theme:string,
    search:string,
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UnsignedHeader = ({theme, search, changeSearch}:HeaderProps) => {
    return (
        <header className={`${classes.Header} ${theme}Header`}>
            <div className={classes.Content}>
                <nav>
                    <Link to="/sign_up">
                        <div className={`${classes.header_button}`}>
                            Увійти / Зареєструватися
                        </div>
                    </Link>
                </nav>
                <nav>
                    <></>
                    <div className={classes.header_input}>
                        <SearchIcon sx={{color:'white'}} />
                        <input placeholder="Пошук" value={search} onChange={changeSearch}/>
                    </div>
                    <ThemeSwitcher theme={theme}/>
                </nav>
            </div>
        </header>
    );
};

export default UnsignedHeader;