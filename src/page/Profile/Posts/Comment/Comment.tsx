import React from 'react';
import {useSelector} from "react-redux";
import {State} from "../../../../redux/store";

import classes from  './styles.module.scss';

import avatar from '../../medusa.jpg'
import {ArrowDownIcon, ArrowLeftIcon, Dot, LikeIcon, TvIcon} from '../../../../shared/Icons';


function Comment({}) {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.Post} ${theme}Post`}>
            <div className={classes.Title}>
                <div className={'flex'}>
                    <img className={classes.Avatar} src={avatar} alt=""/>
                    <div className={classes.User}>
                        <p className={classes.Name}>SenPRoger</p>
                        <p className={classes.Nickname}>@senproger</p>
                    </div>
                    <div className={classes.Reply}>
                        <p>У відповідь</p>
                        <p>@anatoly_ver</p>
                    </div>
                </div>
            </div>
            <div className={`${classes.Text} ${theme}Text`}>
                Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum.
            </div>
            <div className={classes.PostStat}>
                <div className={`${classes.Stat} ${theme}Text`}>
                    <LikeIcon/>
                    <p>150k</p>
                </div>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <ArrowLeftIcon sx={{alignSelf:"center"}}/>
                <p className={classes.Answers}>10 відповідей</p>
                <ArrowDownIcon/>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <p>20 хв. тому</p>
                <TvIcon sx={{height: "17px", alignSelf:"center"}}/>
            </div>
        </div>
    );
}

export default Comment;
