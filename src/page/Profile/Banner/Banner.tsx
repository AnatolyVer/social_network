
import {VertDots,  EffectButton } from '@Icons/*'
import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";
import {Avatar} from "@mui/material";
import React from "react";

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
                <div className='flex ai-c'>
                    <Avatar className={classes.Avatar} alt={user?.nickname.toUpperCase()} src={`https://django-auth-gfm6.onrender.com` +  user?.account_photo}/>
                    <div className={classes.NN}>
                        <p className={classes.Name}>{user?.username}</p>
                        <p className={classes.Nickame}>@{user?.nickname}</p>
                    </div>
                </div>
                <div className='flex ai-c'>
                    <div className={classes.Stat}>
                        <p className={classes.statNumber}>{user?.subscribers_count}</p>
                        <p className={classes.statName}>підписників</p>
                    </div>
                    <div className={classes.Stat}>
                        <p className={classes.statNumber}>{user?.posts_count}</p>
                        <p className={classes.statName}>публікацій</p>
                    </div>
                    <div className={classes.Stat}>
                        <p className={classes.statNumber}>35</p>
                        <p className={classes.statName}>фотографій</p>
                    </div>
                </div>
                <div className='flex ai-c'>
                    <button className={classes.Subscribe}>Підписатися</button>
                    <EffectButton sx={{ color: "white" }}>
                        <VertDots sx={{ color: 'white' }} />
                    </EffectButton>
                </div>
            </div>
        </div>
    );
}

export default Banner;
