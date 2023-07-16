import React, {useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import classes from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/store";
import {changeModalNum, setModalOpen} from "../../redux/action-creators";
import {EffectButton, NextIcon, PreviousIcon} from "../Icons";
import ReactDOM from 'react-dom';

function PhotoModalWindow() {

    const modal = useSelector((state:State) => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dispatch(setModalOpen(false, undefined))
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeModal = () => {
        dispatch(setModalOpen(false, undefined))
        document.body.style.overflow = 'auto';
    }

    const incImage = () => {
        const result = modal.num === modal.images.length - 1 ? 0 : modal.num + 1
        dispatch(changeModalNum(result))
    }

    const decImage = () => {
        const result = modal.num === 0 ? modal.images.length - 1 : modal.num - 1
        dispatch(changeModalNum(result))
    }

    const style = {height: "50px", width: '50px',color: "white"}

    const modalWindow = modal.isOpen ? (
        <div className={`${classes.ModalWindow}`}>
            <CloseIcon onClick={closeModal} sx={{...style, position:'absolute', right:'3%', top:'3%',  cursor:'pointer', zIndex:'10000'}}/>
            <div className={classes.ModalContent}>
                {modal.images.length > 1 &&
                    <EffectButton onClick={() => decImage()} sx={{position:'absolute', top:'50%', left:'5%'}}>
                        <PreviousIcon sx={style}/>
                    </EffectButton>
                }
                <div className={classes.ModalFrame}>
                    <img src={`https://django-auth-gfm6.onrender.com` + modal.image} alt=""/>
                </div>
                {modal.images.length > 1 &&
                    <EffectButton onClick={() => incImage()} sx={{position:'absolute', top:'50%', right:'5%'}}>
                        <NextIcon sx={style}/>
                    </EffectButton>
                }
            </div>
            <div className={classes.Footer}>
                <p>Фото &nbsp;{modal.num + 1}/{modal.images.length}</p>
            </div>
        </div>
    ) : (
        <></>
    )
    const modalRoot = document.getElementById('modal-root') as HTMLElement;

    return ReactDOM.createPortal(modalWindow, modalRoot);
}

export default PhotoModalWindow;
