import React from 'react';
import classes from  './styles.module.scss';
import './photos.scss'
import VerifiedIcon from '@mui/icons-material/Verified';
import {BookmarkIcon, Comment, Dot, EyeIcon, HorDots, LikeIcon, PhoneIcon, ReplyIcon, TvIcon, } from '../../../../shared/Icons'

import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../../redux/store";
import {setModalOpen} from "../../../../redux/action-creators";
import {Avatar} from "@mui/material";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

const changeDateMode = (inputDate: string) => {
    dayjs.locale('uk');
    const formattedDate = dayjs(inputDate).format('DD.MM.YY HH:mm')
    return formattedDate
}

function Post({post}:any) {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const imageCount = post.photos?.length

    const styles = imageCount === 3 ? [2, 4, 4] : [imageCount, imageCount, imageCount, imageCount]
    const theme:string = useSelector((state:State) => state.theme)

    const openModal = (images: [string], num: number) => {
        dispatch(setModalOpen(true, images, num, images.at(num)))
        document.body.style.overflow = 'hidden'
    }

    return (
        <div onClick={() => nav(`/${post.author_nickname}/post/${post.slug}`)} className={`${classes.Post} ${theme}Post`}>
            <div>
                <div className={classes.Title}>
                    <div className={'flex'}>
                        <Avatar alt={post.author_nickname.toUpperCase()} src={`https://django-auth-gfm6.onrender.com` + post.author_account_photo}/>
                        <div className={classes.User}>
                            <div style={{display:'flex', alignItems:"center"}}>
                                <p className={`${classes.Name} ${theme}Text`}>{post.author_username}</p>
                                {post.author_is_verify ? (<VerifiedIcon sx={{marginLeft:'5px', color:'#29ABE2'}}/>) : (<></>)}
                            </div>
                            <p className={`${classes.Nickname}`}>{post.author_nickname}</p>
                        </div>
                    </div>
                    <div className={`${classes.Actions} ${theme}Text`}>
                        <ReplyIcon sx={{cursor: "pointer"}}/>
                        <BookmarkIcon sx={{cursor: "pointer"}}/>
                        <HorDots sx={{cursor: "pointer"}}/>
                    </div>
                </div>
                <div className={`${classes.Text} ${theme}Text`}>
                    {post.content}
                </div>
            </div>

            {post.photos.length > 0 && (
                <div className={classes.Photos}>
                    {post.photos.map((image: File, index: number) => (
                        <img onClick={() => openModal(post.photos, index)} className={`Photo${styles[index]}`} key={index} src={`https://django-auth-gfm6.onrender.com` + image} alt={`${index}`} />
                    ))}
                </div>
            )}

            <div>
                <div className={classes.Date}>
                    <p>Опубліковано: {changeDateMode(post.published_date)}</p>
                    {post.device === 'pc' ? (
                        <TvIcon sx={{height: "17px"}}/>
                    ) : (
                        <PhoneIcon sx={{height: "17px"}}/>
                    )}
                </div>
                <div className={classes.PostStat}>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <LikeIcon sx={{height: "20px", width: "20px", alignSelf:"center", cursor: "pointer"}}/>
                        <p>0</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <Comment sx={{height: "20px", width: "20px", alignSelf:"center", cursor: "pointer"}}/>
                        <p>0</p>
                    </div>
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <div className={`${classes.Stat} ${theme}Text`}>
                        <EyeIcon sx={{height: "20px", width: "20px", alignSelf:"center"}}/>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
