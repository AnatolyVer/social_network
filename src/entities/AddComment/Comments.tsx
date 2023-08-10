import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import classes from "@page/FullPost/styles.module.scss";
import {State} from "@redux/store";
import CustomTextField from "@shared/CustomTextField/CustomTextField";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";

import {Avatar} from "@mui/material";
import {postComment, setFetch} from "@redux/action-creators";
import {IPost} from "@shared/TypesAndInterfaces/IPost";
import {loadComments} from "@shared/preloading/Preloading";
import {IComment} from "@shared/TypesAndInterfaces/IComment";
import Comment from "@entities/Comment/Comment";

const Comments = ({post}: { post:IPost }) => {

    const dispatch = useDispatch()

    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        const load = async() => {
            try {
                dispatch(setFetch({loading:true}))
                const comments = await loadComments(post.slug!)
                setComments(comments)
                dispatch(setFetch({loading:false, text:"Loaded", status:200}))
            }catch (e){
                console.log(e)
            }finally {
                dispatch(setFetch({loading:false, text:'error'}))
            }

        }
        load()
    }, []);

    const user:IProfileInfo = useSelector((state:State) => state.user)
    const [content, setContent] = useState('')

        return (
            <div className={classes.CommentList}>
                <div className={`${classes.Comments}`}>
                    {comments.count ? (
                        comments.results.map((comment: IComment, index:number) => <Comment key={index} comment={comment}/>)
                    ) : (
                        `No comments`
                    )}
                </div>
                <div className={classes.AddComment}>
                    <Avatar alt={user?.nickname.toUpperCase()} src={`https://django-auth-gfm6.onrender.com` + user?.account_photo}/>
                    <CustomTextField value={content} onChange={(e) => setContent(e.target.value)} label="Додайте комментар..."/>
                    <div onClick={() => dispatch(postComment({content, post_id:post.id}))} className={classes.Add}>
                        Додати
                    </div>
                </div>
            </div>

    );
};

export default Comments;