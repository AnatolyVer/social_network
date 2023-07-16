import {useSelector} from "react-redux";
import {State} from "../../../../redux/store";

import classes from  './styles.module.scss';

import avatar from '../../medusa.jpg'
import {ArrowDownIcon, ArrowLeftIcon, Dot, LikeIcon, TvIcon} from '../../../../shared/Icons';


function Comment() {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.Post} ${theme}Post`}>
            <div className={classes.Title}>
                <div className={'flex'}>
                    <img className={classes.Avatar} src={avatar} alt=""/>
                    <div className={classes.User}>
                        <p className={`${classes.Name} ${theme}Text`}>SenPRoger</p>
                        <p className={classes.Nickname}>@senproger</p>
                    </div>
                    <div className={classes.Reply}>
                        <p className={`${theme}Text`}>у відповідь</p>
                        <p className={classes.Nickname}>@anatoly_ver</p>
                    </div>
                </div>
            </div>
            <div className={`${classes.Text} ${theme}Text`}>
                Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum.
            </div>
            <div className={classes.PostStat}>
                <div className={`${classes.Stat} ${theme}Text`}>
                    <LikeIcon sx={{cursor:"pointer"}}/>
                    <p>150k</p>
                </div>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <div className={classes.Answer}>
                    <ArrowLeftIcon/>
                    <p className={classes.Answers}>10 відповідей</p>
                    <ArrowDownIcon sx={{cursor:"pointer"}}/>
                </div>
                <Dot sx={{height: "10px", alignSelf:"center"}}/>
                <p>20 хв. тому</p>
                <TvIcon sx={{height: "17px", marginLeft:'3px', alignSelf:"center"}}/>
            </div>
        </div>
    );
}

export default Comment;
