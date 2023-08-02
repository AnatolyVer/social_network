import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {State} from "@redux/store";
import ThemeSwitcher from "@shared/Switcher/ThemeSwitcher";
import {SearchIcon} from "@Icons/*";

import classes from "./styles.module.scss";

interface HeaderProps{
    search:string,
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UnsignedHeader = ({search, changeSearch}:HeaderProps) => {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <header className={`flex c ai-c ${classes.Header} ${theme}Header`}>
            <div className='Content flex sb'>
                <nav>
                    <Link to="/sign_up">
                        <div className={`${classes.header_button}`}>
                            Увійти / Зареєструватися
                        </div>
                    </Link>
                </nav>
                <nav>
                    <div className={classes.header_input}>
                        <SearchIcon sx={{color:'white'}} />
                        <input placeholder="Пошук" value={search} onChange={changeSearch}/>
                    </div>
                    <ThemeSwitcher/>
                </nav>
            </div>
        </header>
    );
};

export default UnsignedHeader;