
import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {IProfileInfo} from "../../../shared/TypesAndInterfaces/IProfileInfo";

interface BannerProps {
    disabled: boolean,
    user: IProfileInfo | null
}

function SettingsBanner({ disabled, user }: BannerProps) {

    const theme: string = useSelector((state: State) => state.theme)

    const fixed = disabled ? classes.fixed : classes.free
    const color = theme === "light" ? classes.light : classes.dark
    return (
        <div className={`${classes.Banner} ${fixed} ${color}`}>
            {user?.account_banner ? <img className={classes.Image} src={`https://django-auth-gfm6.onrender.com` + user.account_banner} alt="User banner" /> : <></>}
            <div className={classes.User}>
                {user?.account_photo ? <img className={classes.Avatar} src={`https://django-auth-gfm6.onrender.com` +  user?.account_photo} alt="" /> : <></>}
                <div className={classes.NN}>
                    <p className={classes.Name}>{user?.username}</p>
                    <p className={classes.Nickame}>@{user?.nickname}</p>
                </div>
            </div>
        </div>
    );
}

export default SettingsBanner;
