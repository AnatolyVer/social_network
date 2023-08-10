import {getUserInfo, setFetch, setUserInfo} from "@redux/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {getComments, getPostBySlug} from "@redux/saga/API/user";
import { IPost } from "@shared/TypesAndInterfaces/IPost";
import {Dispatch} from "react";
import {AnyAction} from "redux";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import {State} from "@redux/store";


const GettingUser = () => {
    const dispatch = useDispatch()
    const user = useSelector((state:State) => state.user)
    if (!user) dispatch(setUserInfo(JSON.parse(localStorage.getItem('user')!)))
};

export const loadComments = async (slug:string):Promise<any> => {
    const res = await getComments(slug);
    return res.data
}

export const GettingPost = async (slug: string, dispatch:Dispatch<AnyAction>):Promise<IPost | undefined> => {
    try {
        dispatch(setFetch({loading:true, status:999}))
        const res = await getPostBySlug(slug!);
        dispatch(setFetch({status:200, text:'Loaded'}))
        return res.data
    } catch (e: any) {
        console.log(e)
        dispatch(setFetch({status:404, text:'Error'}))
    }finally {
        dispatch(setFetch({loading:false}))
    }
    return undefined
};

export default GettingUser;