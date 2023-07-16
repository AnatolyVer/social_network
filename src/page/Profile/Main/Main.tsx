import React from 'react'
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Posts from "../Posts/Posts";
import classes from './styles.module.scss'
import SearchBar from "./SearchBar/SearchBar";
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";

interface MainProps{
    isFixed:boolean,
    user: IProfileInfo
}

function Main({isFixed, user}:MainProps) {

  const margin = isFixed ? classes.added : classes.no

  return (
        <div className={`${classes.Main} ${margin}`}>
            <div>
                <SearchBar user={user} isFixed={isFixed}/>
                <Posts user={user} />
            </div>
            <ProfileInfo user={user}  isFixed={isFixed}/>
        </div>
    );
}

export default Main;
