
import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";
import {Avatar} from "@mui/material";
import React, {useEffect} from "react";

interface BannerProps {
    user: IProfileInfo | null,
    avatar:string,
    banner:string
}

function SettingsBanner({user, avatar, banner}: BannerProps) {

    const theme: string = useSelector((state: State) => state.theme)

    const color = theme === "light" ? classes.light : classes.dark
    return (
        <div className={`${classes.Banner} ${ classes.free} ${color}`}>
            {user?.account_banner || banner ? <img className={classes.Image} src={banner || `https://django-auth-gfm6.onrender.com` + user?.account_banner} alt="User banner" /> : <></>}
            <div className={classes.User}>
                <Avatar alt={user?.nickname.toUpperCase()} className={classes.Avatar} src={avatar || `https://django-auth-gfm6.onrender.com` + user?.account_photo}/>
                <div className={classes.NN}>
                    <p className={classes.Name}>{user?.username}</p>
                    <p className={classes.Nickame}>@{user?.nickname}</p>
                </div>
            </div>
        </div>
    );
}

export default SettingsBanner;
