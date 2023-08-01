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
import dayjs from "dayjs";

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
                    setSimilar(data.similar_accounts.slice(0, 3))
                    dispatch(setFetch({status:404}))
                }
                else {
                    setProfile(data.data)
                    dispatch(setFetch({status:200}))
                }
            }catch (e){
                dispatch(setFetch({status:500}))
            }finally {
                setTimeout(() => {
                    dispatch(setFetch({text:'Loaded', loading:false}))
                }, 100);
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
    }, [params.nickname]);

    return ( fetch.loading || fetch.status === 0 ? (
            <Loader/>
       ) : (
            <div className='Page flex c'>
                <Header/>
                <div className='Content min-fullness'>
                    {fetch.status === 200 ? (
                        <>
                            <Banner user={profile!} disabled={isFixed}/>
                            <Main user={profile!} isFixed={isFixed}/>
                        </>
                    ) : (
                        <NoUser nickname={params.nickname!} similar={similar}/>
                    )}
                </div>
                <Footer/>
            </div>
        )
    );
}

export default Profile;

