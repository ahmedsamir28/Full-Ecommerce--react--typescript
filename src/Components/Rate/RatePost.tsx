import AddReviewHook from "../../Hooks/User/Reviews/Add_Review_Hook";
import Button from "../../UI-items/Button";
import ReactStars from "react-rating-stars-component";

function RatePost() {
    const  [isLoading ,review,rating ,onChangeReview,ratingChanged ,handleSaveReview] = AddReviewHook()
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
            <div className="flex justify-end ">
                <Button
                    onClick={handleSaveReview}
                    className="capitalize text-md font-medium py-3 px-4 rounded-lg bg-base cursor-pointer text-white bg-blue-700 hover:bg-blue-800"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Add Comment"}
                </Button>
            </div>
        </div>
    );
}

export default RatePost;
