import { useParams } from "react-router-dom";
import { useGetReviewsQuery, useUpdateReviewMutation } from "../../../Redux/RTK Query/reviews_slice";
import { useGetProductIdQuery } from "../../../Redux/RTK Query/products_slice";
import { FormEvent, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";

function UpdateReviewHook() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useGetReviewsQuery(id || '');
    const { data: product, isLoading: productLoading, isError: productError } = useGetProductIdQuery(id || '');
    const [updateReview,] = useUpdateReviewMutation();
    const user = JSON.parse(localStorage.getItem("user") || 'null');

    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [reviewId, setReviewId] = useState<string>('')

    const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
    };

    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const handleCloseEditModal = () => setIsOpenEditModal(false);

    const handleShowEditModal = (e: FormEvent<HTMLButtonElement>, reviewId: string, review: string, rating: number) => {
        e.preventDefault();
        setReviewId(reviewId)
        setReview(review)
        setRating(rating)
        setIsOpenEditModal(true);
    };

    const editReviewHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (review === ' ' || rating === 0) {
            Notify({ msg: "Please complete the data", type: "warn" });
            return
        }
        try {
            await updateReview({ reviewId: reviewId, reviewData: { review, rating } }).unwrap();
            Notify({ msg: "Rating has been successfully modified!", type: "success" });
            setIsOpenEditModal(false)
        } catch (error: unknown) {
            console.log(error);
            Notify({ msg: "There is a problem with the editing process", type: "error" });
        }
    };

    return [data, isLoading, error, product, productLoading, productError, user, review, rating, onChangeReview
        , ratingChanged, isOpenEditModal, handleCloseEditModal, handleShowEditModal, editReviewHandler
    ] as const
}

export default UpdateReviewHook
