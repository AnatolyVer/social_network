import classes from './settings.module.scss'
import Header from "../../layout/Header/Header";
import Footer from '../../layout/Footer/Footer';
import {useSelector} from "react-redux";
import { State } from '@redux/store';
import SettingsNavbar from './SettingNavbar/SettingsNavbar';
import {useEffect, useState} from "react";
import MainPage from "./MainSettings/MainPage";
import SettingsBanner from "./SettingsBanner/SettingsBanner";
import Loader from "../../shared/Loader/Loader";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import {useNavigate, useParams} from "react-router-dom";

const pages = [
    'main',
    'security',
    'language',
    'blocked_accounts',
    'verification'
]

const Settings = () => {

    const theme:string = useSelector((state:State) => state.theme)
    const {page} = useParams()
    const user = useSelector((state:State) => state.user)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [tab, setTab] = useState(pages.indexOf(page!) || 0)

    useEffect(() => {
        setTab(pages.indexOf(page!) || 0)
    }, [page]);

    const tabPages = [
        <MainPage userToEdit={user} />
    ]

    return ( localStorage.getItem('nickname') ? (
            fetch.status !== 200 ? (
                <Loader/>
            ) : (
                <div className={classes.Settings}>
                    <Header/>
                    <div className={(classes.Content)}>
                        <p className={`${classes.Title} ${theme}Text`}>Налаштування</p>
                        <SettingsBanner user={user} disabled={false}/>
                        <div className={`${classes.Body} ${theme}Post`}>
                            <SettingsNavbar tab={tab} setTab={setTab}/>
                            {tabPages[tab]}
                        </div>
                    </div>
                    <Footer/>
                </div>
            )):(
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