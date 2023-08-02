import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import 'react-image-crop/src/ReactCrop.scss'
import ReactCrop, {Crop, PixelCrop } from 'react-image-crop';

import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import { centerAspectCrop, centerAspectCropPx } from './centerAspectCrop';

import Loader from "@entities/Loader/Loader";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";

import classes from './styles.module.scss'

interface CropModalProps {
    open:boolean,
    crop:Crop | undefined,
    setCrop:Dispatch<SetStateAction<Crop | undefined>>,
    setOpen:Dispatch<SetStateAction<boolean>>,
    photo:IAvatarHook,
    aspect:number,
}

const CropModal = ({open, setOpen, crop, setCrop, photo, aspect}:CropModalProps) => {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [loading, setLoading] = useState(false)

    const borderRadius = aspect === 1 ? '50%' : '0'
    const width = aspect === 1 ? '250px' : '640px'
    const height = aspect === 1 ? '250px' : '124px'

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        setLoading(false);
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
            setCompletedCrop(centerAspectCropPx(width, height, aspect))
        }
    }

    function undo() {
        setLoading(true)
        setOpen(false)
        photo.cancelEditing()
        setLoading(false)
    }

    function imageSave() {
        setLoading(true)
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist');
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob');
            }
            const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

            const reader = new FileReader();
            reader.onload = function (event) {
                photo.confirmEditing(file, event.target!.result! as string)
            };
            reader.readAsDataURL(file);
            setOpen(false)
            setLoading(false)
        });
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                )
            }
        },
        100,
        [completedCrop],
    )

    return (
       <>
           {open && (loading ? (
               <Loader/>
                   ) : (
                   <div className={classes.CropModal}>
                       <div className={classes.CropField}>
                           <div className={classes.Frame}>
                               <ReactCrop
                                   crop={crop}
                                   onChange={(_, percentCrop) => setCrop(percentCrop)}
                                   onComplete={(c) => setCompletedCrop(c)}
                                   aspect={aspect}
                                   circularCrop={aspect == 1}
                               >
                                   <img
                                       ref={imgRef}
                                       alt=""
                                       src={photo.avatar.photoToEdit as string}
                                       onLoad={onImageLoad}
                                   />
                               </ReactCrop>
                           </div>
                       </div>
                       <div className={classes.PreviewField}>
                           <canvas
                               ref={previewCanvasRef}
                               style={{
                                   border: '1px solid black',
                                   objectFit: 'fill',
                                   width: width,
                                   height: height,
                                   borderRadius:borderRadius
                               }}
                           />
                           <div className={classes.Buttons}>
                               <button onClick={undo}>Назад</button>
                               <button onClick={imageSave}>Зберегти</button>
                           </div>
                       </div>
                   </div>
           ))}
       </>
    );
};

export default CropModal;