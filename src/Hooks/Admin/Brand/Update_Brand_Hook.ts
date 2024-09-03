import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { IData } from "../../../Interface";
import { useUpdateBrandMutation } from "../../../Redux/RTK Query/brands_slice";

function UpdateBrandHook() {
    const [putBrand, { isLoading: isPosting, isSuccess: updateIsSuccess }] = useUpdateBrandMutation();

    const [selectedEditCategoryId, setSelectedEditCategoryId] = useState<string | null>(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState('');

    const handleCloseEditModal = () => setIsOpenEditModal(false);

    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, category: IData) => {
        e.preventDefault();
        setSelectedEditCategoryId(category._id);
        setName(category.name);
        setImg(category.image);
        setIsOpenEditModal(true);
    };

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (img) URL.revokeObjectURL(img); // Revoke previous object URL to avoid memory leaks
            const newImgUrl = URL.createObjectURL(file);
            setImg(newImgUrl);
            setSelectedFile(file);
        }
    };

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const editCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            if (selectedEditCategoryId) {
                await putBrand({ id: selectedEditCategoryId, formData }).unwrap();
                setIsOpenEditModal(false);
                resetForm();
                Notify({ msg: 'The update was completed successfully', type: 'success' });
            }
        } catch {
            Notify({ msg: 'There is a problem with the update process', type: 'error' });
        }
    };

    const resetForm = () => {
        setName('');
        setSelectedFile(null);
        setImg('');
    };

    useEffect(() => {
        if (updateIsSuccess) {
            resetForm();
        }
    }, [updateIsSuccess]);

    return [isOpenEditModal,handleCloseEditModal,editCategoryHandler,isPosting,onImageChange,img,onChangeName,name,handleShowEditModal]  as const

}

export default UpdateBrandHook
