// RatePost.tsx
import Button from "../../UI-items/Button";
import ReactStars  from "react-rating-stars-component";

function RatePost() {

    const settings = {
        size: 15,
        count: 5,
        color: "#979797",
        activeColor: "rgb(29 78 216)",
        value: 7.5,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        // Uncomment this if you want to handle rating change
        // onChange: newValue => {
        //     OnChangeRateValue(newValue);
        // }
    };

    return (
        <div>
            <div className="mb-5">
            <ReactStars {...settings} />
            </div>
            <textarea
                className="textarea textarea-info w-full"
                placeholder="Bio"
            ></textarea>
            <div className="flex justify-end ">
                <Button className="capitalize text-md font-medium py-3 px-4 rounded-lg bg-base cursor-pointer text-white bg-blue-700 hover:bg-blue-800">
                    add comment
                </Button>
            </div>
        </div>
    );
}

export default RatePost;
