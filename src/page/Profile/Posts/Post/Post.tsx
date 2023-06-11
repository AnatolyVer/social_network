import React from 'react';
import classes from  './styles.module.scss';
import './photos.scss'
import avatar from '../../medusa.jpg'

import {BookmarkIcon, Comment, Dot, EyeIcon, HorDots, LikeIcon, PhoneIcon, ReplyIcon,} from '../../../../shared/Icons'

import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../../redux/store";
import {setModalOpen} from "../../../../redux/action-creators";
function Post({images}:any) {

    const imageCount = images?.length
    const dispatch = useDispatch()
    const styles = imageCount == 3 ? [2, 4, 4] : [imageCount, imageCount, imageCount, imageCount]

    const theme:string = useSelector((state:State) => state.theme)
    const icon = {height: "20px", width: "20px", alignSelf:"center"}

    const openModal = (image: string) => {
        dispatch(setModalOpen(true, image))
    }

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

            {images && (
                <div className={classes.Photos}>
                    {images.map((image: any | undefined, index: number) => (
                        <img onClick={() => openModal(image)} className={`Photo${styles[index]}`} key={index} src={image} alt={`Image ${index}`} />
                    ))}
                </div>
            )}

            <div>
                <div className={classes.Date}>
                    <p>Опубліковано: сьогоднi о 02:14</p>
                    <PhoneIcon sx={{height: "17px" }}/>
                </div>
                <div className={classes.PostStat}>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <LikeIcon sx={icon}/>
                        <p>150k</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <Comment sx={icon}/>
                        <p>150k</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <EyeIcon sx={icon}/>
                        <p>150k</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
