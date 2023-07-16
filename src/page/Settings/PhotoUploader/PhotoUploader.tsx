import React, {useEffect, useState} from 'react';

import CropModal from '../../../shared/CropModal/CropModal';
import {Crop} from "react-image-crop";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
interface PhotoUploaderProps{
    avatar:IAvatarHook,
    aspectUp:number,
    aspectDown:number,
    circle:boolean
}

function PhotoUploader ({avatar, aspectUp, aspectDown, circle}:PhotoUploaderProps){
    const [open, setOpen] = useState<boolean>(false)
    const [crop, setCrop] = useState<Crop>()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        let file = e.target.files?.item(0);
        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                console.log(aspectUp)
                setCrop(undefined)
                setOpen(true)
                console.log(aspectUp)
                reader.onloadend = () => {
                    avatar.uploadImage(file!, reader.result!)
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div>
            {!avatar.avatar.fileToUpload ? (
                <label style={{cursor:'pointer'}} htmlFor={`avatar${aspectUp}`}>
                    Завантажити
                </label>
            ) : (
                <div style={{display:'flex'}}>
                    <p style={{cursor:'pointer'}} onClick={avatar.setDefaultImage}>Видалити</p>
                    &nbsp;
                    &nbsp;
                    <label style={{cursor:'pointer'}} htmlFor={`avatar` + aspectUp}>
                        Змінити
                    </label>
                </div>
            )}

            <input hidden key={Date.now()} type="file" id={`avatar` + aspectUp} name={`avatar` + aspectUp} onChange={(e)=> handleImageChange(e)} />
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} avatar={avatar} aspectUp={aspectUp} aspectDown={aspectDown} circle={circle}/>
        </div>
    );
};

export default PhotoUploader;
