import React, {useEffect} from 'react';

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

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLDivElement) {
            dispatch(setModalOpen(false, undefined))
            document.body.style.overflow = 'auto';
        }
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
        <div onClick={closeModal} className={`${classes.ModalWindow}`}>
            <div className={classes.ModalContent}>
                <EffectButton onClick={() => decImage()} sx={{marginLeft:"25px"}}>
                    <PreviousIcon sx={style}/>
                </EffectButton>
                <div className={classes.ModalFrame}>
                    <img src={modal.image} alt=""/>
                </div>
                <EffectButton onClick={() => incImage()} sx={{marginRight:"25px"}}>
                    <NextIcon sx={style}/>
                </EffectButton>
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
