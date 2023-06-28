import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import classes from './styles.module.scss'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import ReactCrop, {centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/src/ReactCrop.scss'
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";

interface CropModalProps {
    open:boolean,
    crop:Crop | undefined,
    setCrop:Dispatch<SetStateAction<Crop | undefined>>,
    setOpen:Dispatch<SetStateAction<boolean>>,
    avatar:IAvatarHook
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

const CropModal = ({open, setOpen, crop, setCrop, avatar}:CropModalProps) => {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [aspect, setAspect] = useState<number | undefined>(1)

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
            setCompletedCrop(centerAspectCropPx(width, height, aspect))
        }
    }

    function undo() {
        setOpen(false)
        avatar.cancelEditing()
    }

    function imageSave() {
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
           {open && ( <div className={classes.CropModal}>
               <div className={classes.CropField}>
                   <div className={classes.Frame}>
                       <ReactCrop
                           crop={crop}
                           onChange={(_, percentCrop) => setCrop(percentCrop)}
                           onComplete={(c) => setCompletedCrop(c)}
                           aspect={aspect}
                           circularCrop
                       >
                           <img
                               ref={imgRef}
                               alt="Crop me"
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
                           width: 250,
                           height: 250,
                           borderRadius:'50%'
                       }}
                   />
                   <div className={classes.Buttons}>
                       <button onClick={undo}>Назад</button>
                       <button onClick={imageSave}>Зберегти</button>
                   </div>
               </div>
           </div>)}
       </>
    );
};

export default CropModal;