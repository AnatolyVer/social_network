import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import VerificationPage from './VerificationPage/VerificationPage';
import SettingsNavbar from './SettingNavbar/SettingsNavbar';
import SettingsBanner from "./SettingsBanner/SettingsBanner";
import MainPage from "./MainSettings/MainPage";

import Loader from "@entities/Loader/Loader";
import Header from "@layout/Header/Header";
import Footer from '@layout/Footer/Footer';
import { State } from '@redux/store';
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import useAvatarUploading from "@shared/hooks/useAvatarUploading";

import classes from './settings.module.scss'

const pages = [
    'main',
    'security',
    'language',
    'blocked_accounts',
    'verification'
]

const Settings = () => {

    const theme:string = useSelector((state:State) => state.theme)
    const {page = 'main'} = useParams()
    const user = useSelector((state:State) => state.user)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [tab, setTab] = useState(pages.indexOf(page))

    const avatar = useAvatarUploading(user?.account_photo)
    const banner = useAvatarUploading(user?.account_banner)

    useEffect(() => {
        setTab(pages.indexOf(page))
    }, [page]);

    const tabPages = [
        <MainPage banner={banner} avatar={avatar} defaultUser={user}/>,
        <MainPage banner={banner} avatar={avatar} defaultUser={user}/>,
        <MainPage banner={banner} avatar={avatar} defaultUser={user}/>,
        <MainPage banner={banner} avatar={avatar} defaultUser={user}/>,
        <VerificationPage/>
    ]

    return ( user ? (
            <div className='Page fullscreen-height flex column ai-c'>
                <Header/>
                <div className={(classes.Content)}>
                    <p className={`${classes.Title} ${theme}Text`}>Налаштування</p>
                    <SettingsBanner user={user} avatar={avatar.avatar.previewPhoto!} banner={banner.avatar.previewPhoto!}/>
                    <div className={`${classes.Body} ${theme}Post`}>
                        <SettingsNavbar tab={tab} setTab={setTab}/>
                        {tabPages[tab]}
                    </div>
                </div>
                <Footer/>
            </div>
        ):(
            <div className={classes.Settings}>
                <Header/>
                <div className={`${classes.Error} ${theme}Text`}>
                    <h1>Неможливо змінювати налаштування акаунту.</h1>
                </div>
                <Footer/>
            </div>
        )
    );
};

export default Settings;