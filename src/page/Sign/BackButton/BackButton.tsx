import React from 'react';
import {EffectButton, PreviousIcon} from "../../../shared/Icons";

interface BackButtonProps{
    prev: () => void,
    visible: boolean,
    theme: string
}

const BackButton = ({prev, visible,theme}:BackButtonProps) => {

    const button = visible ? (
        <EffectButton onClick={prev} sx={{position:'absolute', left:0, top:0, marginTop:'18px', marginLeft:'25px', width:"40px", height:"40px"}} >
            <PreviousIcon  sx={{width:"40px", height:"40px", color:theme === 'light' ? "black" : 'white'}}/>
        </EffectButton>
    ) : (
        <>
        </>
    )

    return (
        <>
            {button}
        </>
    );
};

export default BackButton;

