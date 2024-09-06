import {FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteProductMutation } from "../../../Redux/RTK Query/products_slice";

function DeleteProductHook() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState('')

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, productId: string) => {
        e.preventDefault();
        setSelectedProductId(productId);
        setIsOpenDeleteModal(true);
    };


    const [deleteProduct, { isLoading: isDeleting, isSuccess, isError: isDeleteError }] = useDeleteProductMutation();

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The product has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isDeleteError) {
            Notify({ msg: 'The product has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    const removeCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedProductId) {
            await deleteProduct(selectedProductId);
            handleCloseDeleteModal();
        }
    };

    return [isOpenDeleteModal,handleCloseDeleteModal,handleShowDeleteModal,isDeleting,removeCategoryHandler] as const

}

export default DeleteProductHook;
