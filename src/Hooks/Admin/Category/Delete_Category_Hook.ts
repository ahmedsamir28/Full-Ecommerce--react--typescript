import { FormEvent, useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "../../../Redux/RTK Query/categories_slice";
import Notify from "../../../Utils/UseNotifaction";

function DeleteCategoryHook() {
    // State for controlling the delete confirmation modal visibility
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // State to store the ID of the category selected for deletion
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    // Function to close the delete modal
    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    // Function to open the delete modal and set the selected category ID
    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault(); // Prevent the default form submission
        setSelectedCategoryId(categoryId); // Store the selected category ID
        setIsOpenDeleteModal(true); // Open the delete confirmation modal
    };

    // RTK Query mutation hook for deleting a category
    const [deleteCategory, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteCategoryMutation();

    // Side effect to handle notification and modal close after deletion success or failure
    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The category has been deleted successfully.', type: 'success' }); // Success notification
            setIsOpenDeleteModal(false); // Close the modal
        } else if (isDeleteError) {
            Notify({ msg: 'The category has not been deleted', type: 'error' }); // Error notification
        }
    }, [isSuccess, isDeleteError]);

    // Function to handle the deletion process when the form is submitted
    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        if (selectedCategoryId) {
            await deleteCategory(selectedCategoryId); // Trigger category deletion
            handleCloseDeleteModal(); // Close the modal
        }
    };

    // Returning state and functions to be used in the component
    return [
        isOpenDeleteModal,handleCloseDeleteModal,handleShowDeleteModal,isDeleting,removeCategoryHandler ] as const;
}

export default DeleteCategoryHook;
