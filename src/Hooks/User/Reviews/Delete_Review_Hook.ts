import { FormEvent, useEffect, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useDeleteReviewMutation } from "../../../Redux/RTK Query/reviews_slice";

function DeleteReviewHook() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [selectedReviewId, setSelectedReviewId] = useState('');

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, reviewId: string) => {
        e.preventDefault();
        setSelectedReviewId(reviewId);
        setIsOpenDeleteModal(true);
    };

    const [deleteReview, { isLoading: isReviewLoading, isSuccess, isError: isDeleteError }] = useDeleteReviewMutation();

    useEffect(() => {
        if (isSuccess) {
            Notify({ msg: 'The review has been deleted successfully.', type: 'success' });
            setIsOpenDeleteModal(false);
        } else if (isDeleteError) {
            Notify({ msg: 'The review has not been deleted', type: 'error' });
        }
    }, [isSuccess, isDeleteError]);

    const removeReviewHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedReviewId) {
            await deleteReview(selectedReviewId);
            handleCloseDeleteModal();
        }
    };

    return [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isReviewLoading, removeReviewHandler] as const
}

export default DeleteReviewHook
