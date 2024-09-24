import RatePost from "./RatePost";
import Modal from "../../UI-items/Modal";
import ReactStars from "react-rating-stars-component";
import Button from "../../UI-items/Button";
import UpdateReviewHook from "../../Hooks/User/Reviews/Update_Review_Hook";
import DeleteReviewHook from "../../Hooks/User/Reviews/Delete_Review_Hook";

function RateContainer() {
    // update review hook
    const [data, isLoading, error, product, productLoading, productError, user, review, rating, onChangeReview,
        ratingChanged, isOpenEditModal, handleCloseEditModal, handleShowEditModal, editReviewHandler] = UpdateReviewHook()

        // delete review hook
    const [isOpenDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, isReviewLoading, removeReviewHandler] = DeleteReviewHook()

    if (isLoading || productLoading) {
        return <div>Loading...</div>;
    }

    if (error || productError) {
        return <div>Error loading reviews. Please try again later.</div>;
    }

    const settings = {
        size: 15,
        count: 5,
        color: "#979797",
        activeColor: "rgb(29 78 216)",
        value: rating,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: ratingChanged,
    };
    return (
        <>
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeReviewHandler}
                title="delete the review"
                add={isReviewLoading ? 'loading ....' : 'delete the review'}
                btnClass="error"
            >
                <p>Are you sure you want to delete the comment?</p>
            </Modal>

            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={editReviewHandler}
                title="edit the review"
                add={isLoading ? 'loading ... ' : "save edit"}
                btnClass="success"
            >
                <div>
                    <div className="mb-5">
                        <ReactStars {...settings} />
                    </div>
                    <textarea
                        value={review}
                        onChange={onChangeReview}
                        className="textarea textarea-info w-full"
                        placeholder="Write your review"
                    ></textarea>
                </div>
            </Modal>

            <div className="container border-2 rounded-xl">
                <div className="flex items-center justify-between border-b-2 py-4">
                    <h3 className="capitalize text-2xl font-semibold ">
                        Product Ratings & Reviews
                    </h3>
                    <div className="flex items-end gap-2">
                        <div className="text-xl font-medium">Overall Rating</div>
                        <div>
                            <i className="fa-solid fa-star text-blue-700"></i> (
                            {product?.data.ratingsAverage || 0})
                        </div>
                    </div>
                </div>

                <div className="mt-5 pb-5">
                    <h4 className="capitalize text-xl border-b-2 pb-2 w-fit">
                        <span className="text-blue-700">
                            {product?.data.ratingsQuantity || 0}
                        </span>{" "}
                        reviews
                    </h4>

                    <div className="mt-5">
                        <RatePost />
                    </div>

                    {data?.data.map((review) => (
                        <div key={review.user.name} className="mt-5 pl-5 border-b-5 pb-3">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h6 className="text-lg font-medium">{review.user.name}</h6>
                                    <span>
                                        rate{" "}
                                        <span className="text-blue-700">( {review.rating} )</span>
                                    </span>
                                </div>
                            </div>

                            <div className="ml-2 border-b-2 py-2 px-3 flex items-center justify-between">
                                <p className="text-sm text-zinc-700 mt-3 leading-relaxed ">
                                    {review.review}
                                </p>
                                {
                                    review.user._id === user._id && <div className="flex gap-5">
                                        <Button onClick={(e) => handleShowEditModal(e, review._id, review.review, review.rating)}>
                                            <i className="fa-solid fa-pen-to-square text-blue-700 hover:text-blue-500 cursor-pointer"></i>
                                        </Button>
                                        <Button onClick={(e) => handleShowDeleteModal(e, review._id)}>
                                            <i className="fa-regular fa-trash-can text-blue-700 hover:text-blue-500 cursor-pointer"></i>
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RateContainer;
