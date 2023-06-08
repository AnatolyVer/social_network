import React from 'react'
import './styles.module.scss'
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Posts from "../Posts/Posts";

import classes from './styles.module.scss'

interface MainProps{
    isFixed:boolean
}

function Main({isFixed}:MainProps) {

  const margin = isFixed ? classes.added : classes.no

  return (
        <div className={`${classes.Main} ${margin}`}>
            <Posts/>
            <ProfileInfo isFixed={isFixed}/>
        </div>
    );
}

export default Main;
