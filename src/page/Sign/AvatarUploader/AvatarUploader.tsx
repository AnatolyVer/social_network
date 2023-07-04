import React, {useState } from 'react';
import {Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CropModal from '../../../shared/CropModal/CropModal';
import {Crop} from "react-image-crop";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import EditIcon from '@mui/icons-material/Edit';
import classes from './styles.module.scss'
interface AvatarUploaderProps{
    avatar:IAvatarHook,
    nickname:string
}

function AvatarUploader ({avatar, nickname}:AvatarUploaderProps){
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

    const defaultButton = avatar.avatar.fileToUpload ? (
        <CloseIcon sx={{position:"absolute", left:-10, top:0, cursor:'pointer'}} onClick={avatar.setDefaultImage}/>
    ) : (<></>)

    const reCutButton = avatar.avatar.fileToUpload ? (
        <EditIcon sx={{position:"absolute", right:-10, top:2, cursor:'pointer', width:'18px', height:'18px'}} onClick={() => setOpen(true)}/>
    ) : (<></>)

    return (
        <div className={classes.AvatarUploader}>
            <label htmlFor="avatar">
                <Avatar alt={nickname.toUpperCase()} src={avatar.avatar.previewPhoto} sx={{marginTop:2, fontSize:'30px', width: 80, height: 80, cursor:'pointer' }}/>
            </label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            {defaultButton}
            {reCutButton}
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} avatar={avatar}/>
        </div>
    );
};

export default AvatarUploader;
