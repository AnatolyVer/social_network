import {Dispatch, SetStateAction} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import SignButton from "../SignButton/SignButton";

import {State} from "@redux/store";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import CustomTextField from "@shared/CustomTextField/CustomTextField";
import CustomPasswordField from "@shared/CustomPasswordField/CustomPasswordField";
import useValidAndChange from "@shared/hooks/useValidAndChange";
import {InputErrors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import {IUser} from '@shared/TypesAndInterfaces/IUser';

import classes from "../styles.module.scss";

interface Props{
    user:IUser,
    changeUser:(updatedValues: Partial<IUser>) => void,
    errors:InputErrors,
    changeErrors:(updatedValues: Partial<InputErrors>) => void,
    page:number,
    setPage:Dispatch<SetStateAction<number>>
}

const FirstPage = ({user, changeUser, errors, changeErrors, page, setPage}:Props) => {

    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const {changeNickname, changeEmail, changePassword, changeConfirmPassword} = useValidAndChange(user, changeUser, changeErrors)

    return (
        <>
            {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
            <div className={classes.Inputs}>
                <CustomTextField required error={errors.nickname} onChange={changeNickname} value={user.nickname}  label="Введіть нікнейм"/>
                <CustomTextField required error={errors.email} onChange={changeEmail} value={user.email} label="Введіть E-mail"/>
                <div className={classes.Passwords}>
                    <CustomPasswordField error={errors.password} value={user.password} label="Введіть пароль" onChange={changePassword}/>
                    <CustomPasswordField error={errors.password} value={user.confirmPassword} label="Повторіть пароль" onChange={changeConfirmPassword}/>
                </div>
            </div>
            <div className={classes.SignField}>
                <SignButton next={() => setPage(page+1)} page={1}/>
                <Link to='/sign_in'>
                    <p className={`${classes.HasAccount} ${classes.Rules}`}>Вже маєте акаунт? Увійти</p>
                </Link>
            </div>
        </>
    );
};

export default FirstPage;