import React, {useEffect, useState} from 'react';

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import classes from './styles.module.scss'
import {cardClasses} from "@mui/material";

function Profile() {

    const [isFixed,setIsFixed] = useState(false);

   useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 165) {
                setIsFixed(true)
            }
            else {
                setIsFixed(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classes.Profile}>
            <div className={classes.Content}>
                <Banner disabled={isFixed}/>
                <Main isFixed={isFixed}/>
            </div>
        </div>
    );
}

export default Profile;
