import React from 'react';
import classes from  './styles.module.scss';

import avatar from '../../medusa.jpg'

import ShortcutIcon from '@mui/icons-material/Shortcut';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TvIcon from '@mui/icons-material/Tv';
import {useSelector} from "react-redux";
import {State} from "../../../../redux/store";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
                    <FavoriteBorderIcon/>
                    <p>150k</p>
                </div>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <ShortcutIcon sx={{alignSelf:"center"}}/>
                <p className={classes.Answers}>10 відповідей</p>
                <ExpandMoreIcon/>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p>20 хв. тому</p>
                <TvIcon sx={{height: "17px", alignSelf:"center"}}/>
            </div>
        </div>
    );
}

export default Comment;
