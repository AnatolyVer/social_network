import React from 'react';
import './styles.scss';

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

interface ProfileInfoProps{
    isFixed:boolean
}

function ProfileInfo({isFixed}:ProfileInfoProps) {

    const theme:string = useSelector((state:State) => state.theme)

    const fixed = isFixed ? "fixed" : "free"
    return (
        <div className={`ProfileInfo ${fixed}`}>
            <div className="Label">
                <AssignmentIndIcon/>
                <p className={`${theme}Text`}>Загальна інформація</p>
            </div>
            <div className={`Info ${theme}Post`}>
                <div className="InfoPart">
                    <CakeIcon/>
                    <p className={`${theme}Text`}>День народження: 18 лис. 2003 р.</p>
                </div>
                <div className="InfoPart">
                    <PlaceIcon/>
                    <p className={`${theme}Text`}>Маріуполь, Україна</p>
                </div>
                <div className="InfoPart">
                    <EventIcon/>
                    <p className={`${theme}Text`}>Учасник з 2 чер. 2023 р.</p>
                </div>
            </div>
            <div className="Label">
                <PeopleAltIcon/>
                <p className={`${theme}Text`}>Друзі, що читають</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>7</p>
            </div>
            <div className={`Friends ${theme}Post`}>
                <img className="Friend" src={o} alt=""/>
                <img className="Friend" src={tw} alt=""/>
                <img className="Friend" src={th} alt=""/>
                <img className="Friend" src={f} alt=""/>
                <div className="Extra Friend">
                    <p>+3</p>
                </div>
            </div>
            <div className="Label">
                <LinkIcon/>
                <p className={`${theme}Text`}>Посилання</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>3</p>
            </div>
            <div className={`Links ${theme}Post`}>
                <TwitterIcon/>
                <InstagramIcon/>
                <TelegramIcon/>
            </div>
            <div className="Label">
                <PhotoIcon/>
                <p className={`${theme}Text`}>Фотографії</p>
                <FiberManualRecordIcon sx={{height: "10px", alignSelf:"center"}}/>
                <p className={`${theme}Text`}>35</p>
                <div className={`All ${theme}Text`}>Усі</div>
            </div>
            <div className={`Photos ${theme}Post`}>
                <img className="Photo" src={first} alt=""/>
                <img className="Photo" src={second} alt=""/>
                <img className="Photo" src={third} alt=""/>
                <img className="Photo" src={third} alt=""/>
                <img className="Photo" src={second} alt=""/>
                <img className="Photo" src={first} alt=""/>
            </div>
        </div>
    );
}

export default ProfileInfo;
