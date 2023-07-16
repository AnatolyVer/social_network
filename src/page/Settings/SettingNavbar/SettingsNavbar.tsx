import BadgeIcon from '@mui/icons-material/Badge';
import ShieldIcon from '@mui/icons-material/Shield';
import PublicIcon from '@mui/icons-material/Public';
import BlockIcon from '@mui/icons-material/Block';
import VerifiedIcon from '@mui/icons-material/Verified';

import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

import { Divider } from '@mui/material';

import classes from './styles.module.scss'
import {Dispatch, Fragment, SetStateAction} from 'react';
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {useNavigate} from "react-router-dom";


const SettingsNavbar = ({tab, setTab}:{tab:number, setTab:Dispatch<SetStateAction<number>>}) => {

    const nav = useNavigate()

    const active = `${classes.ActiveTab} ${classes.Tab}`
    const passive = classes.Tab

    const Tabs = [
        <div onClick={() => nav('/settings/main')} className={tab === 0 ? active : passive}>
            <BadgeIcon/>
            <p>Основна інформація</p>
        </div>,
        <div onClick={() => nav('/settings/security')} className={tab === 1 ? active : passive}>
            <ShieldIcon/>
            <p>Безпека</p>
        </div>,
        <div onClick={() => nav('/settings/language')} className={tab === 2 ? active : passive}>
            <PublicIcon/>
            <p>Мова</p>
        </div>,
        <div onClick={() => nav('/settings/blocked_accounts')} className={tab === 3 ? active : passive}>
            <BlockIcon/>
            <p>Заблоковані акаунти</p>
        </div>,
        <div onClick={() => nav('/settings/verification')} className={`${tab === 4 ? active : passive} ${classes.Verify}`}>
            <VerifiedIcon/>
            <p>Підтвердження</p>
        </div>,
    ]

    const theme:string = useSelector((state:State) => state.theme)

    const dividerStyle = {
        height:'500px',
        borderWidth:'2px',
        borderColor:'gray',
        borderRadius:'10px',
        marginLeft:'20px'
    }

    return (
        <div className={`${classes.SettingsNavbar} ${theme}Text`}>
            <div className={classes.Tabs}>
                <div className={classes.MainTabs}>
                    {Tabs.map((tabElement, index) => (
                        <Fragment key={index}>{tabElement}</Fragment>
                    ))}
                </div>
                <div>
                    <div className={`${classes.Tab} ${classes.Leave}`}>
                        <LogoutIcon/>
                        <p>Вийти з акаунту</p>
                    </div>
                    <div className={`${classes.Tab} ${classes.Delete}`}>
                        <DeleteIcon/>
                        <p>Видалити акаунт</p>
                    </div>
                </div>
            </div>
            <Divider sx={dividerStyle}/>
        </div>
    );
};

export default SettingsNavbar;
