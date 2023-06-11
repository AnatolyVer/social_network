import React, {useState} from 'react'
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Posts from "../Posts/Posts";

import classes from './styles.module.scss'
import SearchBar from "./SearchBar/SearchBar";

interface MainProps{
    isFixed:boolean
}

function Main({isFixed}:MainProps) {

  const margin = isFixed ? classes.added : classes.no

  return (
        <div className={`${classes.Main} ${margin}`}>
            <div>
                <SearchBar isFixed={isFixed}/>
                <Posts/>
            </div>
            <ProfileInfo isFixed={isFixed}/>
        </div>
    );
}

export default Main;
