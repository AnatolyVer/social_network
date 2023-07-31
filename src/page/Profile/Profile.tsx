import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import Loader from '@entities/Loader/Loader';
import NoUser from "@entities/NoUser";
import Header from "@layout/Header/Header";
import Footer from "@layout/Footer/Footer";
import {getProfileInfo} from "@redux/saga/API/user";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";

import {setFetch} from "@redux/action-creators";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import {State} from "@redux/store";

import classes from './styles.module.scss'

function Profile() {

    const params = useParams()
    const dispatch = useDispatch()

    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [profile, setProfile] = useState<IProfileInfo>()
    const [similar, setSimilar] = useState<string[]>([])
    const [isFixed,setIsFixed] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setFetch({loading:true, text:'Loading'}))
                const {data} = await getProfileInfo(params.nickname!)
                if (data.similar_accounts) {
                    setSimilar(data.similar_accounts)
                    dispatch(setFetch({status:404, text:'Loaded'}))
                }
                else {
                    setProfile(data.data)
                    dispatch(setFetch({status:200, text:'Loaded'}))
                }
            }catch (e){
                dispatch(setFetch({status:500}))
            }finally {
                dispatch(setFetch({loading:false}))
            }
        }

        getData()

        const handleScroll = () => {
            setIsFixed(window.pageYOffset >= 165)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        console.log(similar)
        console.log(fetch)
    }, [fetch]);

    return ( fetch.loading ? (
            <Loader/>
       ) : (
            <div className={`${classes.Profile}`}>
                <Header/>
                {fetch.status === 200 ? (
                    <div className={classes.Content}>
                        <Banner user={profile!} disabled={isFixed}/>
                        <Main user={profile!} isFixed={isFixed}/>
                    </div>
                ) : (
                    <></>
                )}
                {fetch.status === 404 ? (
                    <NoUser nickname={params.nickname!} similar={similar}/>
                ):(
                    <></>
                )}
                <Footer/>
            </div>
        )
    );
}

export default Profile;

