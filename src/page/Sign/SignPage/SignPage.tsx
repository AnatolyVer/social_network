import {useEffect, useState} from 'react';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import {clearFetch} from "../../../redux/action-creators";
import useUser from '../hooks/useUser';
import {useDispatch, useSelector} from "react-redux";
import useErrors from '../hooks/useErrors';
import {State} from "@redux/store";
import useAvatarUploading from "../hooks/useAvatarUploading";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";

const SignPage = () => {

    const dispatch = useDispatch()

    const theme:string = useSelector((state:State) => state.theme)
    const signRed: {nickname: boolean, email: boolean} = useSelector((state:State) => state.sign)

    const [page, setPage] = useState(1)
    const [progress, setProgress] = useState(0)
    const [checked, setChecked] = useState(false)
    const [firstTime, setFirstTime] = useState(true)

    const {user, changeUser} = useUser()
    const {errors, isErrors, changeErrors} = useErrors()
    const avatar:IAvatarHook = useAvatarUploading()

    useEffect(() => {
        dispatch(clearFetch())
    }, [user, checked, page])

    useEffect(() => {
        const nicknameTextValid = signRed.nickname ? " " : 'Зайнято'
        changeErrors({
            nickname:{status: !signRed.nickname, border:!signRed.nickname,  text: nicknameTextValid},
        })
    }, [signRed.nickname])

    useEffect(() => {
        if (firstTime){
            setFirstTime(false)
            changeErrors({
                email:{status: signRed.email, border:signRed.email,  text: " "}
            })
        }else{
            const emailText = signRed.email ? " " : 'Зайнято'
            changeErrors({
                email:{status: !signRed.email, border:!signRed.email,  text: emailText}
            })
        }
    }, [signRed.email])

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
        <SecondPage {...obj} avatar={avatar} checked={checked} setChecked={setChecked} />,
        <ThirdPage {...obj} avatar={avatar.avatar.fileToUpload!}/>
    ]

    return (
        <>
            {signPages[page-1]}
        </>
    );
};

export default SignPage;