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
import {Backdrop, CircularProgress} from "@mui/material";
import {IFetch} from "../../shared/TypesAndInterfaces/IFetch";

function Profile() {

    const dispatch = useDispatch()
    const profile:IProfileInfo = useSelector((state:State) => state.profile)
    const params = useParams()
    const fetch:IFetch = useSelector((state:State) => state.fetch)
    const theme:string = useSelector((state:State) => state.theme)

    useEffect(() => {
        dispatch(getProfileInfo(params.nickname!))
    }, [])



    useEffect(() => {
        console.log(fetch)
    }, [fetch])

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

    return ( fetch.status === 999 ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
       ) : (
            <div className={`${classes.Profile}`}>
                <Header/>
                {fetch.status === 200 ? (
                    <div className={classes.Content}>
                        <Banner user={profile} disabled={isFixed}/>
                        <Main user={profile} isFixed={isFixed}/>
                    </div>
                ) : (
                    <div className={`${classes.NoUser} ${theme}Text`}>
                        Користувача не знайдено
                    </div>
                )}
                <Footer/>
                <PhotoModalWindow/>
            </div>
        )
    );
}

export default Profile;

