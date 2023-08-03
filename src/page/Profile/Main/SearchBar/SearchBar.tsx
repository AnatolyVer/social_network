import React, {useState} from "react";
import { useSelector } from "react-redux";

import { State } from "@redux/store";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";

import {FilterIcon, SearchIcon} from "@Icons/*";
import classes from './styles.module.scss'

interface SearchBarProps {
    user:IProfileInfo | null,
    isFixed:boolean
}

function SearchBar({isFixed, user}:SearchBarProps) {

    const [search, setSearch] = useState("");

    const theme:string = useSelector((state:State) => state.theme)
    const fixed = isFixed ? classes.fixed : classes.free

    return (
        <div className={`${classes.Find} ${fixed} ${theme}Body`}>
            <div className={`${classes.Search} ${theme}Text`}>
                <SearchIcon sx={{height: "30px", width:"30px"}} />
                <input className={`${theme}Text`} placeholder={`Пошук у дописах від @${user?.nickname}`} value={search} onChange={event => setSearch(event.target.value)}/>
            </div>
            <div className={`${classes.Filter} ${theme}Text`}>
                <FilterIcon sx={{height: "20px", width:"20px"}} />
                <p className={`${theme}Text`}>Найновіші</p>
            </div>
        </div>
    );
}

export default SearchBar;
