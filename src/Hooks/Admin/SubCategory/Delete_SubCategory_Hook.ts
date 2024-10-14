import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";

function useDeleteSubCategory() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // Change to null for better type handling

    const [deleteSubCategory, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteSubCategoryMutation();

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault();
        setSelectedCategoryId(categoryId);
        setIsOpenDeleteModal(true);
    };

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The subcategory has been deleted successfully.', type: 'success' });
            handleCloseDeleteModal();
        } else if (isDeleteError) {
            Notify({ msg: 'The subcategory has not been deleted.', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    const handleDeleteSubCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCategoryId) {
            await deleteSubCategory(selectedCategoryId);
        }
    };

    return {
        isOpenDeleteModal,
        handleCloseDeleteModal,
        handleShowDeleteModal,
        isDeleting,
        handleDeleteSubCategory,
    };
}

export default useDeleteSubCategory;
