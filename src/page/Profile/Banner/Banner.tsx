import React from 'react'
import './styles.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import banner from "./banner.png"
import avatar from "../medusa.jpg"
import IconButton from "@mui/material/IconButton";

interface BannerProps{
    disabled:boolean
}

function Banner({disabled}:BannerProps) {
    const hidden = disabled ? "invisible" : "visible"
    return (
        <div className={`Banner ${hidden}`}>
            <img className="Image" src={banner} alt="User banner"/>
            <div className="User">
                <img className="Avatar" src={avatar} alt=""/>
                <div className="NN">
                    <p className="Name">AnatolyVer</p>
                    <p className="Nickname">@anatoly_ver</p>
                </div>
                <div className="Stat">
                    <p className="statNumber">1.3к</p>
                    <p className="statName">підписників</p>
                </div>
                <div className="Stat">
                    <p className="statNumber">50</p>
                    <p className="statName">публікацій</p>
                </div>
                <div className="Stat">
                    <p className="statNumber">35</p>
                    <p className="statName">фотографій</p>
                </div>

                <button className="Subscribe">Підписатися</button>
                <IconButton sx={{color:"white"}}>
                    <MoreVertIcon sx={{color:'white'}}/>
                </IconButton>
            </div>
        </div>
    );
}

export default Banner;
