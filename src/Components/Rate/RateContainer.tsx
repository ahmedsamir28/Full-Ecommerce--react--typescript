import Image from "../../UI-items/Image"
import RatePost from "./RatePost"


function RateContainer() {
    return (
        <div className="container border-2 rounded-xl">

            <div className="flex items-center justify-between border-b-2 py-4">
                <h3 className="capitalize text-2xl font-semibold ">
                    Product Ratings & Reviews
                </h3>
                <div className="flex items-end gap-2">
                    <div className="text-xl font-medium">
                        Overall Rating
                    </div>
                    <div>
                        <i className="fa-solid fa-star text-blue-700"></i>  (4.5)
                    </div>
                </div>
            </div>

            <div className="mt-5 ">
                <h4 className="capitalize text-xl border-b-2 pb-2 w-fit">
                    <span className=" text-blue-700"> 102</span> reviews
                    
                </h4>

                <div className="mt-5 ">
                    <RatePost/>
                </div>


                <div className="mt-5 pl-5 border-b-2 pb-5">
                    <div className="flex items-center  gap-3">
                        <div className="">
                        <Image url="https://via.placeholder.com/300x200?text=Image+4" alt="image " className="w-16 h-16 rounded-full border-2" />
                        </div>
                        <div>
                            <h6 className="text-lg font-medium">Name of user</h6>
                            <span>rate <span className="text-blue-700">(3.5)</span> </span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-700 mt-3 leading-relaxed">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium ipsum
                        voluptas nemo consequuntur accusamus veritatis ad eveniet, illo earum neque
                        autem quas sunt quis enim doloribus? Unde quasi nesciunt perferendis.
                    </p>
                </div>

                <div className="mt-5 pl-5 border-b-5 pb-10">
                    <div className="flex items-center  gap-3">
                        <div className="">
                        <Image url="https://via.placeholder.com/300x200?text=Image+4" alt="image " className="w-16 h-16 rounded-full border-2" />
                        </div>
                        <div>
                            <h6 className="text-lg font-medium">Name of user</h6>
                            <span>rate <span className="text-blue-700">(3.5)</span> </span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-700 mt-3 leading-relaxed">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium ipsum
                        voluptas nemo consequuntur accusamus veritatis ad eveniet, illo earum neque
                        autem quas sunt quis enim doloribus? Unde quasi nesciunt perferendis.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default RateContainer