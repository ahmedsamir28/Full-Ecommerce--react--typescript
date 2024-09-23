import { useParams } from "react-router-dom";
import { useCreateReviewMutation } from "../../../Redux/RTK Query/reviews_slice";
import { MouseEvent, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";

function AddReviewHook() {
    const { id } = useParams<{ id: string }>();

    const [createReview, { isLoading }] = useCreateReviewMutation();
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
    };

    const handleSaveReview = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!review || rating === 0) {
            Notify({ msg: "Please add a review and select a rating.", type: "warn" });
            return;
        }

        try {
            await createReview({
                productId: id,
                reviewData: { review, rating }
            }).unwrap();

            Notify({ msg: "Review submitted successfully!", type: "success" });
            setReview("");
            setRating(0);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'data' in error) {
                const errorData = (error as { data?: { errors?: { msg: string }[] } }).data;
                const adminError = (error as { data?: { message?: string } }).data;

                if (errorData?.errors) {
                    const errorMessages = errorData.errors.map(err => err.msg).join(', ');
                    Notify({ msg: `${errorMessages}`, type: "warn" });
                } else if (adminError?.message) {
                    Notify({ msg: adminError.message, type: "error" });
                } else {
                    Notify({ msg: "Error submitting review. Please try again.", type: "error" });
                }
            } else {
                Notify({ msg: "Error submitting review. Please try again.", type: "error" });
            }
        }
    };

    return [isLoading, review, rating, onChangeReview, ratingChanged, handleSaveReview] as const;
}

export default AddReviewHook;
