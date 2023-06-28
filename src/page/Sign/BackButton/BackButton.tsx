import {EffectButton, PreviousIcon} from "../../../shared/Icons";

interface BackButtonProps{
    prev: () => void,
    theme: string
}

const BackButton = ({prev,theme}:BackButtonProps) => {

    return (
        <>
            <EffectButton onClick={prev} sx={{position:'absolute', left:0, top:0, marginTop:'18px', marginLeft:'25px', width:"40px", height:"40px"}} >
                <PreviousIcon  sx={{width:"40px", height:"40px", color:theme === 'light' ? "black" : 'white'}}/>
            </EffectButton>
        </>
    );
};

export default BackButton;

