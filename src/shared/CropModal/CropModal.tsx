import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import classes from './styles.module.scss'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import ReactCrop, {centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/src/ReactCrop.scss'
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import Loader from "../../shared/Loader/Loader";

interface CropModalProps {
    open:boolean,
    crop:Crop | undefined,
    setCrop:Dispatch<SetStateAction<Crop | undefined>>,
    setOpen:Dispatch<SetStateAction<boolean>>,
    avatar:IAvatarHook,
    aspectUp:number,
    aspectDown:number,
    circle:boolean
}


function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 70,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

function centerAspectCropPx(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: 202,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

const CropModal = ({open, setOpen, crop, setCrop, avatar, aspectUp, aspectDown, circle}:CropModalProps) => {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [aspect, setAspect] = useState(aspectUp/aspectDown)
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
        avatar.cancelEditing()
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
            const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

            const reader = new FileReader();
            reader.onload = function (event) {
                avatar.confirmEditing(file, event.target!.result! as string)
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
                                   circularCrop={circle}
                               >
                                   <img
                                       ref={imgRef}
                                       alt=""
                                       src={avatar.avatar.photoToEdit as string}
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