import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";

function DeleteSubCategoryHook() {

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState('')

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault();
        setSelectedCategoryId(categoryId);
        setIsOpenDeleteModal(true);
    };


    const [deleteSubCategory, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteSubCategoryMutation();

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The subcategory has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isDeleteError) {
            Notify({ msg: 'The subcategory has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCategoryId) {
            await deleteSubCategory(selectedCategoryId);
            handleCloseDeleteModal();
        }
    };
    
    return [isOpenDeleteModal,handleCloseDeleteModal,handleShowDeleteModal,isDeleting,removeCategoryHandler] as const
}

export default DeleteSubCategoryHook
