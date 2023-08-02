import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {State} from "@redux/store";
import ThemeSwitcher from "@shared/Switcher/ThemeSwitcher";
import {AddIcon, SearchIcon} from "@Icons/*";

import classes from "./styles.module.scss";

interface HeaderProps{
    search:string,
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SignedHeader = ({search, changeSearch}:HeaderProps) => {

    const theme:string = useSelector((state:State) => state.theme)
    const nickname = localStorage.getItem('nickname')

    return (
        <header className={`flex c ai-c ${classes.Header} ${theme}Header`}>
            <div className='Content flex sb'>
                <nav>
                    <Link to={`/profile/${nickname}`}>
                        <div className={classes.header_button}>Профіль</div>
                    </Link>
                    <button className={classes.header_button}>Стрічка</button>
                    <button className={classes.header_button}>Друзі</button>
                </nav>
                <nav>
                    <Link to={`/posting`}>
                        <div className={classes.add_button}>
                            <AddIcon sx={{color:'white'}}/>
                            <button>Додати пост</button>
                        </div>
                    </Link>
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

export default SignedHeader;