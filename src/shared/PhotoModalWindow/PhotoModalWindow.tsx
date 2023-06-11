import React, { useState } from 'react';

import classes from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/store";
import {setModalOpen} from "../../redux/action-creators";

function PhotoModalWindow() {

    const modal = useSelector((state:State) => state.modal)

    const dispatch = useDispatch()

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLDivElement) {
            dispatch(setModalOpen(false, undefined));
        }
    }

    const modalWindow = modal.isOpen ? (
        <div onClick={closeModal} className={`${classes.ModalWindow}`}>
            <div className={classes.ModalFrame}>
                <img src={modal.image} alt=""/>

            </div>
        </div>
    ) : (
        <></>
    )

    return (
        modalWindow
    );
}

export default PhotoModalWindow;
