import React, {useEffect} from 'react';
import './styles.scss';

import EventIcon from '@mui/icons-material/Event';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import image from "../../ProfileInfo/4.png"
import {useSelector} from "react-redux";
import {State} from "../../../../redux/store";
function Post() {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`Post ${theme}Post`}>
            <div className="Title">
                <div className={`Name ${theme}Text`}>
                    Молитва латинською
                </div>
                <div className="Date">
                    <EventIcon/>
                    <p className={`${theme}Text`}>2 чер. 12:00</p>
                </div>
            </div>
            <div className={`Text ${theme}Text`}>
                Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum.
                Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie,
                et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris.
                Panem nostrum quotidianum da nobis hodie.
            </div>
            <div className="Tags">
                <p className={`${theme}Text`}>#KYIV</p>
                <p className={`${theme}Text`}>#UKRAINE</p>
                <p className={`${theme}Text`}>#GOD</p>
            </div>
            <div className="Image">
                <img src={image} alt=""/>
            </div>
            <div className="PostStat">
                <div className="Stats">
                    <div className="Stat">
                        <FavoriteBorderIcon/>
                        <p className={`${theme}Text`}>150k</p>
                    </div>
                    <div className="Stat">
                        <ChatBubbleIcon/>
                        <p className={`${theme}Text`}>150k</p>
                    </div>
                    <div className="Stat">
                        <VisibilityIcon/>
                        <p className={`${theme}Text`}>150k</p>
                    </div>
                </div>
                <div className="Actions">
                    <BookmarkBorderIcon/>
                    <MoreHorizIcon/>
                </div>
            </div>
        </div>
    );
}

export default Post;
