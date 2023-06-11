import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";

import classes from './styles.module.scss'
import {FilterIcon, SearchIcon} from "../../../../shared/Icons";

function SearchBar({isFixed}:{isFixed:boolean}) {

    const [search, setSearch] = useState("");

    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const theme:string = useSelector((state:State) => state.theme)
    const fixed = isFixed ? classes.fixed : classes.free

    return (
        <div className={`${classes.Find} ${fixed} ${theme}Body`}>
            <div className={`${classes.Search} ${theme}Text`}>
                <SearchIcon sx={{height: "30px", width:"30px"}} />
                <input className={`${theme}Text`} placeholder="Пошук у дописах від @anatoly_ver" value={search} onChange={changeSearch}/>
            </div>
            <div className={`${classes.Filter} ${theme}Text`}>
                <FilterIcon sx={{height: "20px", width:"20px"}} />
                <p className={`${theme}Text`}>Найновіші</p>
            </div>
        </div>
    );
}

export default SearchBar;
