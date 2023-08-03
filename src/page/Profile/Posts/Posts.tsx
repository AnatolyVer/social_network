import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import Post from '@entities/Post/Post';
import {State} from "@redux/store";
import {getPostsByID} from "@redux/saga/API/user";
import { IPost } from '@shared/TypesAndInterfaces/IPost';
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";

import classes from "./styles.module.scss";

interface PostsProps{
    user:IProfileInfo
}

function Posts({user}:PostsProps) {

    const [posts, setPosts] = useState<IPost[]>([])
    const theme:string = useSelector((state:State) => state.theme)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPostsByID(String(user.id));
                setPosts(res.data.results)
            } catch (e: unknown) {
                console.error(e)
            }
        };
        fetchData();
    }, []);

    return (
        <div className={classes.Posts}>
            {posts.length ? (
                posts.map((post:any, index:number) => <Post key={index} post={post}/> )
            ) : (
                <div className={`${classes.NoPost} ${theme}Post ${theme}Text`}>No posts yet</div>
            )}
        </div>
    );
}

export default Posts;
