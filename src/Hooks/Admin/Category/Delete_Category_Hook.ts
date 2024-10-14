import { FormEvent, useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "../../../Redux/RTK Query/categories_slice";
import Notify from "../../../Utils/UseNotifaction";

function DeleteCategoryHook() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault();
        setSelectedCategoryId(categoryId);
        setIsOpenDeleteModal(true);
    };

    const [deleteCategory, { isLoading: isDeleting, isSuccess, isError }] = useDeleteCategoryMutation();

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The category has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isError) {
            Notify({ msg: 'The category has not been deleted', type: 'error' });
        }
    }, [isSuccess, isError]);

    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCategoryId) {
            await deleteCategory(selectedCategoryId);
            handleCloseDeleteModal();
        }
    };

    return [
        isOpenDeleteModal,
        handleCloseDeleteModal,
        handleShowDeleteModal,
        isDeleting,
        removeCategoryHandler
    ] as const;
}

export default DeleteCategoryHook;
