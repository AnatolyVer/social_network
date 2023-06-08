import React from 'react';
import classes from  './styles.module.scss';

import avatar from '../../medusa.jpg'

import {BookmarkIcon, Comment, Dot, EyeIcon, HorDots, LikeIcon, PhoneIcon, ReplyIcon,} from '../../../../shared/Icons'

import {useSelector} from "react-redux";
import {State} from "../../../../redux/store";
function Post() {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.Post} ${theme}Post`}>
            <div>
                <div className={classes.Title}>
                    <div className={'flex'}>
                        <img className={classes.Avatar} src={avatar} alt=""/>
                        <div className={classes.User}>
                            <p className={classes.Name}>AnatolyVer</p>
                            <p className={classes.Nickname}>@anatoly_ver</p>
                        </div>
                    </div>
                    <div className={classes.Actions}>
                        <ReplyIcon/>
                        <BookmarkIcon/>
                        <HorDots/>
                    </div>
                </div>
                <div className={`${classes.Text} ${theme}Text`}>
                    Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum.
                    Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie,
                    et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris.
                    Panem nostrum quotidianum da nobis hodie.
                </div>
            </div>
            <div>
                <div className={classes.Date}>
                    <p>Опубліковано: сьогоднi о 02:14</p>
                    <PhoneIcon sx={{height: "17px"}}/>
                </div>
                <div className={classes.PostStat}>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <LikeIcon/>
                        <p>150k</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <Comment/>
                        <p>150k</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <EyeIcon/>
                        <p>150k</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
