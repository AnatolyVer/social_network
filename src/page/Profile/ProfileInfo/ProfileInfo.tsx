import React from 'react';
import classes from './styles.module.scss';
import first from "./1.png"
import second from "./2.png"
import third from "./3.png"
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import dayjs from 'dayjs';
import 'dayjs/locale/uk'
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
import {Avatar, AvatarGroup} from '@mui/material';
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";

interface ProfileInfoProps{
    isFixed:boolean,
    user:IProfileInfo | null
}

const changeDateMode = (inputDate: string) => {
    dayjs.locale('uk');
    const date = inputDate?.slice(0, 10)
    const formattedDate = dayjs(date).format('D MMM YYYY')
    return formattedDate
}



function ProfileInfo({isFixed, user}:ProfileInfoProps) {

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
                    <p className={`${theme}Text`}>День народження: {changeDateMode(user?.birth_date!)}</p>
                </div>
                {user?.city ? (
                    <div className={`${classes.InfoPart}  ${theme}Text`}>
                        <PlaceIcon/>
                        <p className={`${theme}Text`}>{user?.city}, {user?.country}</p>
                    </div>
                ) : (
                    <></>
                )}
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <CalendarIcon/>
                    <p className={`${theme}Text`}>Учасник з {changeDateMode(user?.created_at!)}</p>
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
                <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>
                </AvatarGroup>
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
