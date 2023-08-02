import React, {useState } from 'react';
import {Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CropModal from '@entities/CropModal/CropModal';
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

    const display = avatar.avatar.fileToUpload ? 'block' : 'none'

    return (
        <div className={classes.AvatarUploader}>
            <label htmlFor="avatar">
                <Avatar alt={nickname.toUpperCase()} src={avatar.avatar.previewPhoto} sx={{marginTop:2, fontSize:'30px', width: 80, height: 80, cursor:'pointer' }}/>
            </label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            <CloseIcon sx={{position:"absolute", left:-10, top:0, cursor:'pointer', display:display}} onClick={avatar.setDefaultImage}/>
            <EditIcon sx={{position:"absolute", right:-10, top:2, cursor:'pointer', width:'18px', height:'18px', display:display}} onClick={() => setOpen(true)}/>
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} photo={avatar} aspect={1} circle={true}/>
        </div>
    );
};

export default AvatarUploader;
