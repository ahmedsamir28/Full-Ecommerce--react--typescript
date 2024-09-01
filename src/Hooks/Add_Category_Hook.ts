import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { usePostCategoryMutation } from "../Redux/RTK Query/categories_slice";
import Notify from "../Utils/UseNotifaction";

function AddCategoryHook() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [img, setImg] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState('');

    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    const [postCategory, { isLoading: isPosting, isSuccess }] = usePostCategoryMutation();

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Revoke previous object URL to avoid memory leaks
            if (img) URL.revokeObjectURL(img);
            const newImgUrl = URL.createObjectURL(file);
            setImg(newImgUrl);
            setSelectedFile(file);
        }
    }

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() === "" || selectedFile === null) {
            Notify({ msg: 'Please complete the data', type: 'warn' });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            await postCategory(formData).unwrap();
            setIsOpenConfirmModal(false);
            resetForm();
            Notify({ msg: 'The addition was completed successfully', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem with the addition process', type: 'error' });
        }
    };

    const resetForm = () => {
        setName('');
        setSelectedFile(null);
        setImg('');
    };

    useEffect(() => {
        if (isSuccess) {
            resetForm()
        }
    }, [isSuccess]);

    return [isOpenConfirmModal, img, name, handleCloseModal, handleShowModal, onImageChange, onChangeName, handleSubmit, isPosting] as const
}

export default AddCategoryHook;
