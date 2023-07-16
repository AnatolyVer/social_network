import {useState} from 'react';
import ava from "../default.png";
import {AvatarState} from '../Interfaces/IAvatar';

const UseAvatarUploading = (image?: string) => {
    const [defaultImage, setDefaultImag] = useState(image || '')

    const [fileToUpload, setFileToUpload] = useState<File | null>()
    const [photoToEdit, setPhotoToEdit] = useState<string | ArrayBuffer>()
    const [previewPhoto, setPreviewPhoto] = useState<string>(image || '')
    const [lastAvatar, setLastAvatar] = useState<File | null>()

    const avatar:AvatarState = {
        fileToUpload,
        photoToEdit,
        previewPhoto,
        lastAvatar
    }

    const uploadImage = (file:File, photo:string | ArrayBuffer) => {
        setLastAvatar(fileToUpload)
        setFileToUpload(file)
        setPhotoToEdit(photo)
    }

    const setDefaultImage = () => {
        setFileToUpload(null)
        setPreviewPhoto(defaultImage)
        setPhotoToEdit(undefined)
    }

    const cancelEditing = () => {
        setFileToUpload(lastAvatar)
    }

    const confirmEditing = (file:File, photo:string) => {
        setFileToUpload(file);
        setLastAvatar(file)
        setPreviewPhoto(photo);
    }

    return {avatar, uploadImage, setDefaultImage, cancelEditing, confirmEditing}
};

export default UseAvatarUploading;