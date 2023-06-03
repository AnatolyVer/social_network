import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './styles.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {State} from "../../redux/store";
import {switchTheme} from "../../redux/action-creators";

function Header() {
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const theme:string = useSelector((state:State) => state.theme)

    useEffect(() => {
        if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "light")
        dispatch(switchTheme(localStorage.getItem("theme") || 'light'))
        if (localStorage.getItem("theme") !== "light"){
            document.body.style.backgroundColor = 'gray';
        }
        else{
            document.body.style.backgroundColor = '#EBEBEB';
        }
    }, [])
    const swapTheme = () => {
        if (localStorage.getItem("theme") === "light"){
            dispatch(switchTheme("dark"))
            localStorage.setItem("theme", "dark")
            document.body.style.backgroundColor = 'gray';
        }
        else{
            dispatch(switchTheme("light"))
            localStorage.setItem("theme", "light")
            document.body.style.backgroundColor = '#EBEBEB';
        }
    }
    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const style = {height: "30px", width:"30px", color: "white"}

    const switcher = theme === "light" ? <BedtimeIcon sx={style}/> : <LightModeIcon sx={style}/>

    return (
        <header className={`Header ${theme}Header`}>
            <div className="Content">
                <nav>
                    <button className="header_button">Профіль</button>
                    <button className="header_button">Стрічка</button>
                    <button className="header_button">Друзі</button>
                </nav>
                <nav>
                    <div className="add_button">
                        <AddCircleIcon sx={{height: "30px", width:"30px", color: "white"}}/>
                        <button className="header_button">Додати пост</button>
                    </div>
                    <div className="header_input">
                        <SearchIcon sx={{height: "30px", width:"30px", color: "white"}} />
                        <input className="Search" placeholder="Пошук" value={search} onChange={changeSearch}/>

                    </div>
                    <IconButton sx={{height:"50px", width:"50px" , color: "white"}} onClick = {swapTheme}>
                        {switcher}
                    </IconButton>
                </nav>
            </div>
        </header>
    );
}

export default Header;
