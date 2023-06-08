import React, {useState} from 'react';

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import Post from './Post/Post';
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import classes from "./styles.module.scss";

function Posts() {

    const [search, setSearch] = useState("");

    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={classes.Posts}>
            <div className={`${classes.Find} $`}>
                <div className={`${classes.Search} ${theme}Text`}>
                    <SearchIcon sx={{height: "30px", width:"30px"}} />
                    <input className={`${theme}Text`} placeholder="Пошук у дописах від @anatoly_ver" value={search} onChange={changeSearch}/>
                </div>
                <div className={`${classes.Filter} ${theme}Text`}>
                    <FilterListIcon sx={{height: "20px", width:"20px"}} />
                    <p className={`${theme}Text`}>Найновіші</p>
                </div>
            </div>
            <div className={classes.PostList}>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    );
}

export default Posts;
