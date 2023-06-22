import React from 'react';

import img1 from './img1.png'
import img2 from './img2.jpg'
import img3 from './3.jpeg'
import img4 from './4.jpg'

import Post from './Post/Post';
import classes from "./styles.module.scss";
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";

function Posts({posts}:{posts:any[]}) {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={classes.Posts}>
            {posts.length ? (
                posts.map((post:any) => <div>post</div> )
            ) : (
                <div className={`${classes.NoPost} ${theme}Post ${theme}Text`}>No posts yet</div>
            )}
        </div>
    );
}

export default Posts;

/*
<Post images={[img1,img2, img1, img2]}/>
<Post images={[img3,img4, img3, img4]}/>
<Post/>
<Post/>
<Post/>
<Post/>*/
