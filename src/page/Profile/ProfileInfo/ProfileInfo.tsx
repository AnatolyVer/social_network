import React from 'react';
import classes from './styles.module.scss';



import o from "./1.jpg"
import tw from "./2.jpg"
import th from "./3.jpg"
import f from "./4.jpg"

import first from "./1.png"
import second from "./2.png"
import third from "./3.png"
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {
    CakeIcon,
    CalendarIcon,
    Dot,
    EffectButton,
    InstagramIcon,
    LinkIcon,
    PeopleIcon,
    PhotoIcon,
    PlaceIcon,
    PortraitIcon,
    TelegramIcon,
    TwitterIcon
} from '../../../shared/Icons';

interface ProfileInfoProps{
    isFixed:boolean
}

function ProfileInfo({isFixed}:ProfileInfoProps) {

    const theme:string = useSelector((state:State) => state.theme)
    const color = theme === "light" ? "black" : "white"
    const fixed = isFixed ? classes.fixed : classes.free
    return (
        <div className={`${classes.ProfileInfo} ${fixed}`}>
            <div className={`${theme}Text ${classes.Label}`}>
                <PortraitIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Загальна інформація</p>
            </div>
            <div className={`${classes.Info} ${theme}Post`}>
                <div className={`${classes.InfoPart} ${theme}Text`}>
                    <CakeIcon/>
                    <p className={`${theme}Text`}>День народження: 18 лис. 2003 р.</p>
                </div>
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <PlaceIcon/>
                    <p className={`${theme}Text`}>Маріуполь,</p>
                    <h4>&nbsp;Україна</h4>
                </div>
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <CalendarIcon/>
                    <p className={`${theme}Text`}>Учасник з</p>
                    <h4>&nbsp;2 чер. 2023 р.</h4>
                </div>
            </div>
            <div className={`${theme}Text ${classes.Label}`}>
                <PeopleIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Друзі, що читають</p>
                <div className="flex">
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <p className={`${theme}Text ${classes.bold}`}>7</p>
                </div>

            </div>
            <div className={`${classes.Friends} ${theme}Post`}>
                <img className={`${classes.Friend}`} src={o} alt=""/>
                <img className={`${classes.Friend}`} src={tw} alt=""/>
                <img className={`${classes.Friend}`} src={th} alt=""/>
                <img className={`${classes.Friend}`} src={f} alt=""/>
                <div className={`${classes.Extra} ${classes.Friend}`}>
                    <p>+3</p>
                </div>
            </div>
            <div className={`${theme}Text ${classes.Label}`}>
                <LinkIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Посилання</p>
                <div className="flex">
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <p className={`${theme}Text ${classes.bold}`}>3</p>
                </div>
            </div>
            <div className={`${classes.Links} ${theme}Post ${theme}Text`}>
                <EffectButton sx={{color}}>
                    <TwitterIcon/>
                </EffectButton>
                <EffectButton sx={{color}}>
                    <InstagramIcon/>
                </EffectButton>
                <EffectButton sx={{color}}>
                    <TelegramIcon/>
                </EffectButton>
            </div>

            <div className={`${theme}Text ${classes.Label} ${classes.sb}`}>
                <div className="flex">
                    <PhotoIcon/>
                    <p className={`${theme}Text ${classes.bold}`}>Фотографії</p>
                    <div className="flex">
                        <Dot sx={{height: "10px", width: "10px",  alignSelf:"center"}}/>
                        <p className={`${theme}Text ${classes.bold}`}>35</p>
                    </div>
                </div>
                <div className={`${classes.All} ${theme}Text`}>Усі</div>
            </div>
            <div className={`${classes.Photos} ${theme}Post`}>
                <img className={`${classes.Photo}`} src={first} alt=""/>
                <img className={`${classes.Photo}`} src={second} alt=""/>
                <img className={`${classes.Photo}`} src={third} alt=""/>
            </div>
        </div>
    );
}

export default ProfileInfo;
