import React, {useState} from 'react';
import {Crop} from "react-image-crop";

import CropModal from '@entities/CropModal/CropModal';
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
interface PhotoUploaderProps{
    photo:IAvatarHook,
    aspect:number,
}

function PhotoUploader ({photo, aspect}:PhotoUploaderProps){
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
                    photo.uploadImage(file!, reader.result!)
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div>
            {!photo.avatar.fileToUpload ? (
                <label className='clickable' htmlFor={`avatar${aspect}`}>
                    Завантажити
                </label>
            ) : (
                <div className='flex'>
                    <p className='clickable' onClick={photo.setDefaultImage}>Видалити</p>
                    &nbsp;
                    &nbsp;
                    <label className='clickable' htmlFor={`avatar` + aspect}>
                        Змінити
                    </label>
                </div>
            )}

            <input hidden key={Date.now()} type="file" id={`avatar` + aspect} name={`avatar` + aspect} onChange={(e)=> handleImageChange(e)} />
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} photo={photo} aspect={aspect}/>
        </div>
    );
};

export default PhotoUploader;
