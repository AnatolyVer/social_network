import React from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import {EffectButton} from "@Icons/*";
import { Link } from 'react-router-dom';

import classes from './styles.module.scss'

const SettingsButton = () => {
    return (
        <Link to={'/settings'}>
            <EffectButton className={classes.Gear} sx={{color:'white'}}>
                <SettingsIcon/>
            </EffectButton>
        </Link>
    );
};

export default SettingsButton;