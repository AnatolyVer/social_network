import Post from './Post/Post';
import classes from "./styles.module.scss";
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {useEffect, useState} from "react";
import {getPostsByNickname} from "../../../redux/saga/API/user";
import { IProfileInfo } from '@shared/TypesAndInterfaces/IProfileInfo';

function Posts({user}:{user:IProfileInfo}) {

    const [posts, setPosts] = useState<any>([])

    const fetch = async () => {
        try {
            const res = await getPostsByNickname(user.nickname);
            setPosts(res.data)
        } catch (e: any) {
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    const theme:string = useSelector((state:State) => state.theme)

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
