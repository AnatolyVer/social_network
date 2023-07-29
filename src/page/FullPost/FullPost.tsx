import React, {useEffect, useState} from 'react';

import classes from './styles.module.scss'
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import {useSelector} from "react-redux";
import {State} from "../../redux/store";
import {getPostBySlug} from "../../redux/saga/API/user";
import {useParams} from "react-router-dom";
import Post from '@entities/Post/Post';
import Loader from '@entities/Loader/Loader';
import {IPost} from "@shared/TypesAndInterfaces/IPost";
import { Avatar } from '@mui/material';
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import CustomTextField from '../../shared/CustomTextField/CustomTextField';

const FullPost = () => {

    const user:IProfileInfo = useSelector((state:State) => state.user)

    const params = useParams()
    const theme:string = useSelector((state:State) => state.theme)
    const slug = params.slug
    const [post, setPost] = useState<IPost>()
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [comment, setComment] = useState('')
    const fetch = async () => {
        try {
            const res = await getPostBySlug(slug!);
            setPost(res.data)
            setLoaded(true)
            console.log(res.data)
        } catch (e: any) {
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    const page = (
        <div className={classes.FullPost}>
            <Header/>
            <div className={`${classes.Content} ${theme}Text`}>
                {loaded ? (
                   <>
                       <Post post={post!}/>
                       <div>
                           <div className={`${classes.Comments} `}>
                               {post!.comments ? (
                                   `Comments`
                               ) : (
                                   `No comments`
                               )}

                           </div>
                           <div className={classes.AddComment}>
                               <Avatar alt={user.nickname.toUpperCase()} src={`https://django-auth-gfm6.onrender.com` + user.account_photo}/>
                               <CustomTextField id="comment" label="Додайте комментар..." variant="outlined"  onChange={(e) => setComment(e.target.value)} value={comment}/>
                               <div className={classes.Add}>
                                   Додати
                               </div>
                           </div>
                       </div>

                   </>
                ) : (
                    <h1>Нема такого, пішов у сраку</h1>
                )}

            </div>
            <Footer/>
        </div>
    )

    return (loading ? <Loader/> : page);
};

export default FullPost