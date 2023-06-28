import React, {useState } from 'react';
import {Avatar} from "@mui/material";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import CropModal from '../../../shared/CropModal/CropModal';
import {Crop} from "react-image-crop";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";

interface AvatarUploaderProps{
    theme:string,
    avatar:IAvatarHook
}

function AvatarUploader ({theme, avatar}:AvatarUploaderProps){
    const [open, setOpen] = useState<boolean>(false)
    const [crop, setCrop] = useState<Crop>()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        let file = e.target.files?.item(0);
        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                setCrop(undefined)
                setOpen(true)
                reader.onloadend = () => {
                    avatar.uploadImage(file!, reader.result!)
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const border = theme === 'light' ? "black" : 'white'

    const defaultButton = avatar.avatar.fileToUpload ? (
        <CloseIcon sx={{position:"absolute", left:0, top:0, cursor:'pointer'}} onClick={avatar.setDefaultImage}/>
    ) : (<></>)

    const reCutButton = avatar.avatar.fileToUpload ? (
        <ContentCutIcon sx={{position:"absolute", right:0, top:2, cursor:'pointer', width:'18px', height:'18px'}} onClick={() => setOpen(true)}/>
    ) : (<></>)

    return (
        <div style={{position: "relative"}}>
            <label htmlFor="avatar"><Avatar alt="Remy Sharp" src={avatar.avatar.previewPhoto!}  sx={{marginTop:2, width: 80, height: 80, border:`1px solid ${border} `, cursor:'pointer' }}/></label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            {defaultButton}
            {reCutButton}
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} avatar={avatar}/>
        </div>
    );
};

export default AvatarUploader;
