import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteSubCategoryMutation } from "../../../Redux/RTK Query/subCategory_slice";

function DeleteSubCategoryHook() {
    // State to manage the visibility of the delete confirmation modal
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // State to hold the ID of the selected subcategory to delete
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    // Function to close the delete confirmation modal
    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    // Function to show the delete confirmation modal and set the selected category ID
    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, categoryId: string) => {
        e.preventDefault(); // Prevent default button click behavior
        setSelectedCategoryId(categoryId); // Set the ID of the subcategory to delete
        setIsOpenDeleteModal(true); // Open the modal
    };

    // Set up mutation for deleting a subcategory
    const [deleteSubCategory, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteSubCategoryMutation();

    // Effect to handle notifications based on the success or error of the deletion
    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The subcategory has been deleted successfully.', type: 'success' }); // Notify success
            setIsOpenDeleteModal(false); // Close the modal on success
        } else if (isDeleteError) {
            Notify({ msg: 'The subcategory has not been deleted', type: 'error' }); // Notify error
        }
    }, [isSuccess, isDeleteError]); // Run this effect whenever success or error state changes

    // Function to handle the deletion of the subcategory
    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (selectedCategoryId) { // Check if a category ID is selected
            await deleteSubCategory(selectedCategoryId); // Call the mutation to delete the subcategory
            handleCloseDeleteModal(); // Close the modal after deletion
        }
    };

    // Return state and handlers for use in the component
    return [isOpenDeleteModal,handleCloseDeleteModal,handleShowDeleteModal,isDeleting,removeCategoryHandler] as const
}

export default DeleteSubCategoryHook
