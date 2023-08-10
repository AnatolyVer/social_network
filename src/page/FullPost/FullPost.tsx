import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Post from '@entities/Post/Post';
import Loader from '@entities/Loader/Loader';
import {NotFound} from "@entities/NotFound";
import Comments from '@entities/AddComment/Comments';
import Header from "@layout/Header/Header";
import Footer from "@layout/Footer/Footer";
import {State} from "@redux/store";
import {IPost} from "@shared/TypesAndInterfaces/IPost";
import {GettingPost} from "@shared/preloading/Preloading";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";

const FullPost = () => {

    const dispatch = useDispatch()
    const params = useParams()

    const fetch:IFetch = useSelector((state:State) => state.fetch)
    const theme:string = useSelector((state:State) => state.theme)

    const slug = params.slug

    const [post, setPost] = useState<IPost>()

    useEffect(() => {
        const fetch = async () => {
            const post = await GettingPost(slug!, dispatch)
            setPost(post)
        }
        fetch()
    }, []);

    const page = (
        <div className='Page fullscreen-height flex column ai-c'>
            <Header/>
            <div className={`Content flex sb ai-c fullness ${theme}Text`}>
                {post ? (
                   <>
                       <Post post={post!}/>
                       <Comments post={post!}/>
                   </>
                ) : (
                    <>
                        <NotFound/>
                        <h1>Пост, що ви шукаетє не існує або видалено</h1>
                    </>
                )}
            </div>
            <Footer/>
        </div>
    )

    return (fetch.status === 999 ? <Loader/> : page);
};

export default FullPost