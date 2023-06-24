import React, {Dispatch, SetStateAction, useState } from 'react';
import {Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function AvatarUploader ({theme, ava, avatar, setAvatar}:{theme:string, ava:string, avatar: File | null | undefined, setAvatar: Dispatch<SetStateAction<File | null | undefined>> }){
    const [photo, setPhoto] = useState(ava)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        let file = e.target.files?.item(0);

        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                setAvatar(file);
                reader.onloadend = () => {
                    // @ts-ignore
                    setPhoto(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const setDefaultPhoto = () => {
        setPhoto(ava)
        setAvatar(null)
    }

    const border = theme === 'light' ? "black" : 'white'

    const defaultButton = avatar?.name !== undefined ? (
        <CloseIcon sx={{position:"absolute", left:0, top:0, cursor:'pointer'}} onClick={setDefaultPhoto}/>
    ) : (<></>)

    return (
        <div style={{position: "relative"}}>
            <label htmlFor="avatar"><Avatar alt="Remy Sharp" src={photo}  sx={{marginTop:2, width: 80, height: 80, border:`1px solid ${border} `, cursor:'pointer' }}/></label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            {defaultButton}
        </div>
    );
};

export default AvatarUploader;
