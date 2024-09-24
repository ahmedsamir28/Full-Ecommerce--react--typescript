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

    if (error || productError) {
        return <div className="text-center text-red-600 my-10">Error loading reviews. Please try again later.</div>;
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

                {
                    productLoading ? (<div className="flex items-center justify-between border-b-2 py-4 animate-pulse">
                        <div className="h-8 w-48 bg-gray-300 rounded"></div> {/* Title Skeleton */}
                        <div className="flex items-end gap-2">
                            <div className="h-6 w-32 bg-gray-300 rounded"></div> {/* Overall Rating Label Skeleton */}
                            <div className="flex items-center gap-1">
                                <div className="h-6 w-6 bg-gray-300 rounded"></div> {/* Star Icon Skeleton */}
                                <div className="h-6 w-8 bg-gray-300 rounded"></div> {/* Rating Number Skeleton */}
                            </div>
                        </div>
                    </div>) : (<div className="flex items-center justify-between border-b-2 py-4">
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
                    </div>)
                }


                <div className="mt-5 pb-5">
                    {
                        productLoading ? (<div className="border-b-2 pb-2 w-fit animate-pulse">
                            <div className="h-6 w-24 bg-gray-300 rounded"></div> {/* Reviews Skeleton */}
                        </div>) : (<h4 className="capitalize text-xl border-b-2 pb-2 w-fit">
                            <span className="text-blue-700">
                                {product?.data.ratingsQuantity || 0}
                            </span>{" "}
                            reviews
                        </h4>
                        )
                    }

                    <div className="mt-5">
                        <RatePost />
                    </div>

                    {
                        isLoading ? (<div className="space-y-6">
                            {data?.data.map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-6 bg-gray-200 rounded"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                                    </div>

                                    <div className="mt-4 px-4 py-2 bg-gray-50 rounded-lg border flex justify-between items-center">
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>) : (<div className="space-y-6">
                            {data?.data.map((review) => (
                                <div key={review.user.name} className="">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h6 className="text-lg font-semibold">{review.user.name}</h6>
                                            <span className="text-gray-500">
                                                rate{" "}
                                                <span className="text-blue-700 font-bold">
                                                    ({review.rating})
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 px-4 py-2 bg-gray-50 rounded-lg border flex justify-between items-center">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {review.review}
                                        </p>
                                        {review.user?._id === user?._id && (
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={(e) =>
                                                        handleShowEditModal(e, review._id, review.review, review.rating)
                                                    }
                                                    className="text-blue-700 hover:text-blue-500 cursor-pointer"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Button>
                                                <Button
                                                    onClick={(e) => handleShowDeleteModal(e, review._id)}
                                                    className="text-blue-700 hover:text-blue-500 cursor-pointer"
                                                >
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>)
                    }
                </div>
            </div>
        </>
    );
}

export default RateContainer;
