import {useSelector} from "react-redux";

import {State} from "@redux/store";
import avatar from '@page/Profile/medusa.jpg'

import {ArrowDownIcon, ArrowLeftIcon, Dot, LikeIcon, TvIcon} from '@Icons/*';

import classes from './styles.module.scss';
import {IComment} from "@shared/TypesAndInterfaces/IComment";
import {Avatar} from "@mui/material";
import React from "react";
import {convertDate} from "@shared/DateConvertor";


function Comment({comment}:{comment:IComment}) {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.Post} ${theme}Post`}>
            <div className={classes.Title}>
                <div className={'flex'}>
                    <Avatar className={classes.Avatar} alt={comment?.author_nickname.toUpperCase()} src={comment?.author_account_photo}/>
                    <div className={classes.User}>
                        <p className={`${classes.Name} ${theme}Text`}>{comment.author_username}</p>
                        <p className={classes.Nickname}>@{comment.author_nickname}</p>
                    </div>
                    <div className={classes.Reply}>
                        <p className={`${theme}Text`}>у відповідь</p>
                        <p className={classes.Nickname}>@anatoly_ver</p>
                    </div>
                </div>
            </div>
            <div className={`${classes.Text} ${theme}Text`}>
                {comment.content}
            </div>
            <div className={classes.PostStat}>
                <div className={`${classes.Stat} ${theme}Text`}>
                    <LikeIcon sx={{cursor:"pointer"}}/>
                    <p>{comment.likes_count}</p>
                </div>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <div className={classes.Answer}>
                    <ArrowLeftIcon/>
                    <p className={classes.Answers}>{comment.replies_count} відповідей</p>
                    <ArrowDownIcon sx={{cursor:"pointer"}}/>
                </div>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <p>{convertDate(comment.published_date)}</p>
                <TvIcon sx={{height: "17px", marginLeft:'3px', alignSelf:"center"}}/>
            </div>
        </div>
    );
}

export default Comment;
