import {EffectButton, PreviousIcon} from "@Icons/*";
import {useSelector} from "react-redux";
import {State} from "@redux/store";

interface BackButtonProps{
    prev: () => void,
}

const BackButton = ({prev}:BackButtonProps) => {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <>
            <EffectButton onClick={prev} sx={{position:'absolute', left:0, top:0, marginTop:'18px', marginLeft:'25px', width:"40px", height:"40px"}} >
                <PreviousIcon  sx={{width:"40px", height:"40px", color:theme === 'light' ? "black" : 'white'}}/>
            </EffectButton>
        </>
    );
};

export default BackButton;

