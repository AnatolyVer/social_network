import React, {useEffect, useState} from 'react';
import Banner from "./Banner/Banner";
import MiniBanner from "./MiniBanner/MiniBanner";
import Main from "./Main/Main";
import {useSelector} from "react-redux";
import {State} from "../../redux/store";
import "./styles.scss"

function Profile() {

    const [miniBannerIsDisabled,setMiniBannerIsDisabled] = useState(true);
    const [isFixed,setIsFixed] = useState(false);

   /* useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 200) {
                setMiniBannerIsDisabled(false)
                setIsFixed(true)
            }
            else {
                setMiniBannerIsDisabled(true)
                setIsFixed(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);*/

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`Profile`}>
            <div className="Content">
                <Banner disabled={!miniBannerIsDisabled}/>
                <MiniBanner disabled={miniBannerIsDisabled}/>
                <Main isFixed={isFixed}/>
            </div>
        </div>
    );
}

export default Profile;
