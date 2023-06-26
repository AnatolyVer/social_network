import React from 'react'

import {VertDots,  EffectButton } from '../../../shared/Icons'
import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";

interface BannerProps {
    disabled: boolean,
    user: IProfileInfo | null
}

function Banner({ disabled, user }: BannerProps) {

    const theme: string = useSelector((state: State) => state.theme)

    const fixed = disabled ? classes.fixed : classes.free
    const color = theme === "light" ? classes.light : classes.dark
    return (
        <div className={`${classes.Banner} ${fixed} ${color}`}>
            {user?.account_banner ? <img className={classes.Image} src={`https://django-auth-gfm6.onrender.com` + user.account_banner} alt="User banner" /> : <></>}
            <div className={classes.User}>
                <img className={classes.Avatar} src={`https://django-auth-gfm6.onrender.com` +  user?.account_photo} alt="" />
                <div className={classes.NN}>
                    <p className={classes.Name}>{user?.username}</p>
                    <p className={classes.Nickame}>@{user?.nickname}</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.statNumber}>{user?.subscribers_count}</p>
                    <p className={classes.statName}>підписників</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.statNumber}>50</p>
                    <p className={classes.statName}>публікацій</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.statNumber}>35</p>
                    <p className={classes.statName}>фотографій</p>
                </div>

                <button className={classes.Subscribe}>Підписатися</button>
                <EffectButton sx={{ color: "white" }}>
                    <VertDots sx={{ color: 'white' }} />
                </EffectButton>
            </div>
        </div>
    );
}

export default Banner;
