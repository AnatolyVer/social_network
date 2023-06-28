import React, {useEffect, useState} from 'react';

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import classes from './styles.module.scss'
import PhotoModalWindow from "../../shared/PhotoModalWindow/PhotoModalWindow";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import {getProfileInfo} from "../../redux/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/store";
import {IProfileInfo} from "../../shared/TypesAndInterfaces/IProfileInfo";
import {useParams} from "react-router-dom";
import {IFetch} from "../../shared/TypesAndInterfaces/IFetch";
import Loader from '../../shared/Loader/Loader';

function Profile() {

    const dispatch = useDispatch()
    const profile:IProfileInfo = useSelector((state:State) => state.profile)
    const fetch:IFetch = useSelector((state:State) => state.fetch)
    const theme:string = useSelector((state:State) => state.theme)
    const params = useParams()

    useEffect(() => {
        dispatch(getProfileInfo(params.nickname!))
    }, [])

    const [isFixed,setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.pageYOffset >= 165)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( fetch.status !== 200 ? (
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
                    <div className={`${classes.NoUser} ${theme}Text`}>
                        Користувача @{params.nickname!} не знайдено
                    </div>
                )}
                <Footer/>
            </div>
        )
    );
}

export default Profile;

