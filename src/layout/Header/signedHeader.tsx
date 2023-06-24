import React from 'react';
import classes from "./styles.module.scss";
import {Link} from "react-router-dom";
import {AddIcon, SearchIcon} from "../../shared/Icons";
import ThemeSwitcher from "../../shared/Switcher/ThemeSwitcher";

interface HeaderProps{
    theme:string,
    search:string,
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SignedHeader = ({theme, search, changeSearch}:HeaderProps) => {

    const nickname = localStorage.getItem('nickname')

    return (
        <header className={`${classes.Header} ${theme}Header`}>
            <div className={classes.Content}>
                <nav>
                    <Link to={`/profile/${nickname}`}>
                        <div className={classes.header_button}>Профіль</div>
                    </Link>
                    <button className={classes.header_button}>Стрічка</button>
                    <button className={classes.header_button}>Друзі</button>
                </nav>
                <nav>
                    <div className={classes.add_button}>
                        <AddIcon sx={{color:'white'}}/>
                        <button>Додати пост</button>
                    </div>
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

export default SignedHeader;