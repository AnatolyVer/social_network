import {getUserInfo, setFetch} from "@redux/action-creators";
import {useDispatch} from "react-redux";
import {getPostBySlug} from "@redux/saga/API/user";
import { IPost } from "@shared/TypesAndInterfaces/IPost";
import {Dispatch} from "react";
import {AnyAction} from "redux";


const GettingUser = () => {
    const dispatch = useDispatch()
    const nickname = localStorage.getItem("nickname")
    dispatch(getUserInfo(nickname!))
};
export const GettingPost = async (slug: string, dispatch:Dispatch<AnyAction>):Promise<IPost | undefined> => {
    try {
        dispatch(setFetch({loading:true}))
        const res = await getPostBySlug(slug!);
        dispatch(setFetch({status:200}))
        return res.data
    } catch (e: any) {
        console.log(e)
        dispatch(setFetch({status:404}))
    }finally {
        dispatch(setFetch({loading:false}))
    }
    return undefined
};

export default GettingUser;