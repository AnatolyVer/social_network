import React from 'react';
import classes from './styles.module.scss';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PhotoIcon from '@mui/icons-material/Photo';

import o from "./1.jpg"
import tw from "./2.jpg"
import th from "./3.jpg"
import f from "./4.jpg"

import first from "./1.png"
import second from "./2.png"
import third from "./3.png"
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import IconButton from "@mui/material/IconButton";

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
                <AssignmentIndIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Загальна інформація</p>
            </div>
            <div className={`${classes.Info} ${theme}Post`}>
                <div className={`${classes.InfoPart} ${theme}Text`}>
                    <CakeIcon/>
                    <p className={`${theme}Text`}>День народження: 18 лис. 2003 р.</p>
                </div>
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <PlaceIcon/>
                    <p className={`${theme}Text`}>Маріуполь, Україна</p>
                </div>
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <EventIcon/>
                    <p className={`${theme}Text`}>Учасник з</p>
                    <p className={`${classes.bold}`}>2 чер. 2023 р.</p>
                </div>
            </div>
            <div className={`${theme}Text ${classes.Label}`}>
                <PeopleAltIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Друзі, що читають</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>7</p>
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
                <p className={`${theme}Text`}>Посилання</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>3</p>
            </div>
            <div className={`${classes.Links} ${theme}Post ${theme}Text`}>
                <IconButton sx={{color}}>
                    <TwitterIcon/>
                </IconButton>
                <IconButton sx={{color}}>
                    <InstagramIcon/>
                </IconButton>
                <IconButton sx={{color}}>
                    <TelegramIcon/>
                </IconButton>
            </div>

            <div className={`${theme}Text ${classes.Label}`}>
                <PhotoIcon/>
                <p className={`${theme}Text`}>Фотографії</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>35</p>
                <div className={`${classes.All} ${theme}Text`}>Усі</div>
            </div>
            <div className={`${classes.Photos} ${theme}Post`}>
                <img className={`${classes.Photo}`} src={first} alt=""/>
                <img className={`${classes.Photo}`} src={second} alt=""/>
                <img className={`${classes.Photo}`} src={third} alt=""/>
                <img className={`${classes.Photo}`} src={third} alt=""/>
                <img className={`${classes.Photo}`} src={second} alt=""/>
                <img className={`${classes.Photo}`} src={first} alt=""/>
            </div>
        </div>
    );
}

export default ProfileInfo;
