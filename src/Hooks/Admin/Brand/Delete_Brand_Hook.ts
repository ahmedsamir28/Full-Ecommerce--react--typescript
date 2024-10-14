import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteBrandMutation } from "../../../Redux/RTK Query/brands_slice";

function DeleteBrandHook() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault();
        setSelectedCategoryId(categoryId);
        setIsOpenDeleteModal(true);
    };

    const [deleteBrand, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteBrandMutation();

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The category has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isDeleteError) {
            Notify({ msg: 'The category has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCategoryId) {
            await deleteBrand(selectedCategoryId);
            handleCloseDeleteModal();
        }
    };

    return [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] as const;
}

export default DeleteBrandHook;
