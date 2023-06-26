import React, {Dispatch, SetStateAction, useEffect, useState } from 'react';
import {Avatar} from "@mui/material";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import CropModal from '../../../shared/CropModal/CropModal';
import {Crop} from "react-image-crop";

interface AvatarUploaderProps{
    theme:string,
    ava:string,
    avatar: File | null | undefined,
    setAvatar: Dispatch<SetStateAction<File | null | undefined>>,
    photo: string,
    setPhoto:Dispatch<SetStateAction<string | undefined>>,
}

function AvatarUploader ({theme, ava, avatar, setAvatar, photo, setPhoto}:AvatarUploaderProps){
    const [open, setOpen] = useState<boolean>(false)
    const [crop, setCrop] = useState<Crop>()
    const [previewPhoto, setPreviewPhoto] = useState(ava)
    const [lastAvatar, setLastAvatar] = useState<File | null>()
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        const reader = new FileReader();
        let file = e.target.files?.item(0);
        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                setLastAvatar(avatar)
                setCrop(undefined)
                setAvatar(file);
                setOpen(true)
                reader.onloadend = () => {
                    // @ts-ignore
                    setPhoto(reader.result)

                };
                reader.readAsDataURL(file);
            }
        }
    };

    const setDefaultPhoto = () => {
        setAvatar(null)
        setPreviewPhoto(ava)
    }

    const border = theme === 'light' ? "black" : 'white'

    const defaultButton = avatar?.name !== undefined ? (
        <CloseIcon sx={{position:"absolute", left:0, top:0, cursor:'pointer'}} onClick={setDefaultPhoto}/>
    ) : (<></>)

    const reCutButton = avatar?.name !== undefined ? (
        <ContentCutIcon sx={{position:"absolute", right:0, top:2, cursor:'pointer', width:'18px', height:'18px'}} onClick={() => setOpen(true)}/>
    ) : (<></>)

    return (
        <div style={{position: "relative"}}>
            <label htmlFor="avatar"><Avatar alt="Remy Sharp" src={previewPhoto}  sx={{marginTop:2, width: 80, height: 80, border:`1px solid ${border} `, cursor:'pointer' }}/></label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            {defaultButton}
            {reCutButton}
            <CropModal lastAvatar={lastAvatar} setLastAvatar={setLastAvatar} setPreviewPhoto={setPreviewPhoto} setFile={setAvatar} crop={crop} setCrop={setCrop} open={open} setOpen={setOpen} src={photo} setSrc={setPhoto}/>
        </div>
    );
};

export default AvatarUploader;
