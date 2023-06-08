import React from 'react'

import {VertDots,  EffectButton } from '../../../shared/Icons'

import banner from "./banner.png"
import avatar from "../medusa.jpg"

import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";

interface BannerProps{
    disabled:boolean
}

function Banner({disabled}:BannerProps) {

    const theme:string = useSelector((state:State) => state.theme)

    const fixed = disabled ? classes.fixed : classes.free
    const color = theme === "light" ? classes.light : classes.dark
    return (
        <div className={`${classes.Banner} ${fixed} ${color}`}>
            <img className={classes.Image} src={banner} alt="User banner"/>
            <div className={classes.User}>
                <img className={classes.Avatar} src={avatar} alt=""/>
                <div className={classes.NN}>
                    <p className={classes.Name}>AnatolyVer</p>
                    <p className={classes.Nickame}>@anatoly_ver</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.statNumber}>1.3к</p>
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
                <EffectButton sx={{color:"white"}}>
                    <VertDots sx={{color:'white'}}/>
                </EffectButton>
            </div>
        </div>
    );
}

export default Banner;
