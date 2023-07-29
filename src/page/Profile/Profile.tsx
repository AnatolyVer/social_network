import React, {useEffect, useState} from 'react';

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import classes from './styles.module.scss'
import Header from "@layout/Header/Header";
import Footer from "@layout/Footer/Footer";

import {useParams} from "react-router-dom";
import Loader from '@entities/Loader/Loader';
import {getProfileInfo} from "@redux/saga/API/user";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import NoUser from "@entities/NoUser";

function Profile() {

    const params = useParams()

    const [profile, setProfile] = useState<IProfileInfo>()
    const [similar, setSimilar] = useState<string[]>([])
    const [fetch, setFetch] = useState(true)
    const [isFixed,setIsFixed] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await getProfileInfo(params.nickname!)
                if (data.similar_accounts) {
                    setSimilar(data.similar_accounts)
                }
                else setProfile(data.data)
            }catch (e){
                console.log(e)
            }finally {
                setFetch(false)
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

    return ( fetch ? (
            <Loader/>
       ) : (
            <div className={`${classes.Profile}`}>
                <Header/>
                {profile ? (
                    <div className={classes.Content}>
                        <Banner user={profile!} disabled={isFixed}/>
                        <Main user={profile!} isFixed={isFixed}/>
                    </div>
                ) : (
                    <NoUser nickname={params.nickname!} similar={similar!}/>
                )}
                <Footer/>
            </div>
        )
    );
}

export default Profile;

