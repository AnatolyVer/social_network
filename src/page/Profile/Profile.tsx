import React, {useEffect, useState} from 'react';

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import classes from './styles.module.scss'
import PhotoModalWindow from "../../shared/PhotoModalWindow/PhotoModalWindow";

function Profile() {

    const [isFixed,setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.pageYOffset >= 165)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${classes.Profile}`}>
            <div className={classes.Content}>
                <Banner disabled={isFixed}/>
                <Main isFixed={isFixed}/>
            </div>
            <PhotoModalWindow/>
        </div>
    );
}

export default Profile;
