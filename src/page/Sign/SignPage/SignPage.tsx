import {useEffect, useState} from 'react';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import {clearFetch} from "@redux/action-creators";
import useUser from '../hooks/useUser';
import {useDispatch, useSelector} from "react-redux";
import useErrors from '../hooks/useErrors';
import {State} from "@redux/store";
import useAvatarUploading from "../hooks/useAvatarUploading";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import dayjs from "dayjs";
import {IUser} from "@shared/TypesAndInterfaces/IUser";
import useValidAndChange from "@page/Sign/hooks/useValidAndChange";

const defUser: IUser = {
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth_date: dayjs().format('YYYY-MM-DD')
};

const SignPage = () => {

    const dispatch = useDispatch()

    const theme:string = useSelector((state:State) => state.theme)
    const signRed = useSelector((state:State) => state.sign)

    const [page, setPage] = useState(1)
    const [progress, setProgress] = useState(0)
    const [checked, setChecked] = useState(false)
    const [firstTime, setFirstTime] = useState(true)

    const {user, changeUser} = useUser(defUser)
    const {errors, isErrors, changeErrors} = useErrors(setProgress)
    const avatar:IAvatarHook = useAvatarUploading()
    const validAndChange = useValidAndChange(user, changeUser, changeErrors)


    useEffect(() => {
        dispatch(clearFetch())
    }, [user, checked, page])

    useEffect(() => {
        if (checked) setProgress(prevState => prevState + 17)
        else setProgress(prevState => prevState - 17)
    }, [checked]);

    useEffect(() => {
        if (!firstTime){
            const nicknameTextValid = signRed.nickname ? " " : 'Зайнято'
            const emailText = signRed.email ? " " : 'Зайнято'
            changeErrors({
                nickname:{status: !signRed.nickname, border:!signRed.nickname,  text: nicknameTextValid},
                email:{status: !signRed.email, border:!signRed.email,  text: emailText}
            })
        }
        setFirstTime(false)
    }, [signRed])

    const obj = {
        theme,
        progress,
        page,
        setPage,
        user,
        changeUser,
        errors,
        isErrors,
        changeErrors
    }

    const signPages = [
        <FirstPage {...obj}/>,
        <SecondPage {...obj} avatar={avatar} checked={checked} setChecked={setChecked} {...validAndChange} />,
        <ThirdPage {...obj} avatar={avatar.avatar.fileToUpload!}/>
    ]

    return (
        <>
            {signPages[page-1]}
        </>
    );
};

export default SignPage;