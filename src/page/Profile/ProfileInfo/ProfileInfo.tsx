import classes from './styles.module.scss';
import ContactsIcon from '@mui/icons-material/Contacts';
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import dayjs from 'dayjs';
import 'dayjs/locale/uk'
import {
    CakeIcon,
    CalendarIcon,
    Dot,
    PeopleIcon,
    PlaceIcon,
    PortraitIcon,

} from '@Icons/*';
import {Avatar, AvatarGroup} from '@mui/material';
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";

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
                    <p className={`${theme}Text`}>День народження: <strong>{changeDateMode(user?.birth_date!)}</strong></p>
                </div>
                {user?.city ? (
                    <div className={`${classes.InfoPart}  ${theme}Text`}>
                        <PlaceIcon/>
                        <p className={`${theme}Text`}>{user?.city}, <strong>{user?.country}</strong></p>
                    </div>
                ) : (
                    <></>
                )}
                <div className={`${classes.InfoPart}  ${theme}Text`}>
                    <CalendarIcon/>
                    <p className={`${theme}Text`}>Учасник з <strong>{changeDateMode(user?.created_at!)}</strong></p>
                </div>
            </div>

            <div className={`${theme}Text ${classes.Label}`}>
                <ContactsIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Про себе</p>
            </div>
            <div className={`${classes.Bio} ${theme}Post ${theme}Text`}>
                <p>
                    Велика війна, яка почалася майже рік тому змінила кожне українське місто і село, однак у Харкові, можливо, ці зміни відчуваються по-особливому.
                    Друге за величиною місто України, університетський та науковий центр, з ошатними парками, до яких на dsgfdfg dfg
                </p>
                {/*{user?.biography}*/}
            </div>
            <div className={`${theme}Text ${classes.Label}`}>
                <PeopleIcon/>
                <p className={`${theme}Text ${classes.bold}`}>Друзі, що підписані</p>
                <div className="flex">
                    <Dot sx={{height: "10px", alignSelf:"center"}}/>
                    <p className={`${theme}Text ${classes.bold}`}>7</p>
                </div>

            </div>
            <div className={`${classes.Friends} ${theme}Post`}>
                <AvatarGroup max={4}>
                    {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>*/}
                </AvatarGroup>
            </div>
        </div>
    );
}

export default ProfileInfo;
