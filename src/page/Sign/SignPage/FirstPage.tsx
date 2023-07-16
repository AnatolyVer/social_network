import classes from "../styles.module.scss";

import HeaderSign from "../HeaderSign/HeaderSign";
import SignButton from "../SignButton/SignButton";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {State} from "../../../redux/store";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import CustomTextField from "../../../shared/CustomTextField/CustomTextField";
import CustomPasswordField from "../../../shared/CustomPasswordField/CustomPasswordField";
import useValidAndChange from "../hooks/useValidAndChange";
import {Errors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import { IUser } from '@shared/TypesAndInterfaces/IUser';
import {Dispatch, SetStateAction} from "react";

interface Props{
    theme:string,
    progress:number,
    user:IUser,
    changeUser:(updatedValues: Partial<IUser>) => void,
    errors:Errors,
    changeErrors:(updatedValues: Partial<Errors>) => void,
    page:number,
    setPage:Dispatch<SetStateAction<number>>
}
const FirstPage = ({theme, progress, user, changeUser, errors, changeErrors, page, setPage}:Props) => {
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const {changeNickname, changeEmail, changePassword, changeConfirmPassword} = useValidAndChange(user, changeUser, changeErrors)

    return (
        <div className={classes.Sign}>
            <div className={`${classes.SignForm} ${theme}Post ${theme}Text`}>
                <HeaderSign page={1} progress={progress}/>
                {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
                <div className={classes.Inputs}>
                    <CustomTextField required error={errors.nickname} onChange={changeNickname} value={user.nickname} id="1" label="Введіть нікнейм" variant="outlined" />
                    <CustomTextField required error={errors.email} onChange={changeEmail} value={user.email} id="2" label="Введіть E-mail" variant="outlined" />
                    <div className={classes.Passwords}>
                        <CustomPasswordField error={errors.password} theme={theme} value={user.password} text="Введіть пароль" onChange={changePassword}/>
                        <CustomPasswordField error={errors.password} theme={theme} value={user.confirmPassword} text="Повторіть пароль" onChange={changeConfirmPassword}/>
                    </div>
                </div>
                <div className={classes.SignField}>
                    <SignButton theme={theme} next={() => setPage(page+1)} page={1}/>
                    <Link to='/sign_in'>
                        <p className={`${classes.HasAccount} ${classes.Rules}`}>Вже маєте акаунт? Увійти</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;