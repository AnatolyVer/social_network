import React, {useState} from 'react';
import './styles.scss';

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import Post from './Post/Post';
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";

function Posts() {

    const [search, setSearch] = useState("");

    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className="Posts">
            <div className="Find">
                <div className={`Search ${theme}Text`}>
                    <SearchIcon sx={{height: "30px", width:"30px"}} />
                    <input className={`Search ${theme}Text`} placeholder="Пошук у дописах від @anatoly_ver" value={search} onChange={changeSearch}/>
                </div>
                <div className={`Filter ${theme}Text`}>
                    <FilterListIcon sx={{height: "20px", width:"20px"}} />
                    <p className={`${theme}Text`}>Найновіші</p>
                </div>
            </div>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
}

export default Posts;
