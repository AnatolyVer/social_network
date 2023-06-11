import React from 'react';

import img1 from './img1.png'
import img2 from './img2.jpg'

import Post from './Post/Post';
import classes from "./styles.module.scss";

function Posts() {

    return (
        <div className={classes.Posts}>
            <Post images={[img1,img2, img2, img1]}/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
}

export default Posts;
