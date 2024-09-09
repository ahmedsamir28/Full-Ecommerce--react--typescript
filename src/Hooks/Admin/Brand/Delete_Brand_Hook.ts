import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteBrandMutation } from "../../../Redux/RTK Query/brands_slice";

function DeleteBrandHook() {
    // State to manage the visibility of the delete confirmation modal
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // State to store the ID of the category/brand to be deleted
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    // Function to close the delete confirmation modal
    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    // Function to show the delete confirmation modal and set the selected category ID
    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault(); // Prevent default form submission
        setSelectedCategoryId(categoryId); // Set the ID of the category/brand to delete
        setIsOpenDeleteModal(true); // Open the delete confirmation modal
    };

    // RTK Query mutation for deleting a brand/category
    const [deleteBrand, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteBrandMutation();

    // Effect hook to display notifications based on the success or failure of the delete operation
    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The category has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false); // Close the modal on successful deletion
        } else if (isDeleteError) {
            Notify({ msg: 'The category has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    // Handler function to trigger the deletion process
    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        if (selectedCategoryId) {
            // Call the delete brand mutation with the selected category ID
            await deleteBrand(selectedCategoryId);
            handleCloseDeleteModal(); // Close the modal after deletion
        }
    };

    // Return all necessary states and handlers to be used in the component
    return [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] as const;
}

export default DeleteBrandHook;
