import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteProductMutation } from "../../../Redux/RTK Query/products_slice";

function DeleteProductHook() {
    // Modal visibility state
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // Selected product ID for deletion
    const [selectedProductId, setSelectedProductId] = useState('');

    // Close the delete modal
    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    // Open the delete modal and set the product ID to delete
    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, productId: string) => {
        e.preventDefault();
        setSelectedProductId(productId);
        setIsOpenDeleteModal(true);
    };

    // RTK Query mutation hook for deleting a product
    const [deleteProduct, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteProductMutation();

    // Effect to show notification based on the delete result
    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The product has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isDeleteError) {
            Notify({ msg: 'The product has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    // Handle product deletion
    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedProductId) {
            await deleteProduct(selectedProductId);  // Call the delete mutation
            handleCloseDeleteModal();  // Close the modal after deletion
        }
    };

    // Return values and functions used in the component
    return [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isDeleting, removeCategoryHandler] as const;
}

export default DeleteProductHook;
