import React from 'react'
import './styles.scss'
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Posts from "../Posts/Posts";

interface MainProps{
    isFixed:boolean
}

function Main({isFixed}:MainProps) {
  return (
        <div className='Main'>
            <Posts/>
            <ProfileInfo isFixed={isFixed}/>
        </div>
    );
}

export default Main;
