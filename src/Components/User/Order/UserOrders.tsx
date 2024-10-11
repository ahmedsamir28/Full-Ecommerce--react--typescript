import { useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../Redux/RTK Query/orders_slice";
import SubTitle from "../../../Utils/SubTitle"
import UserOrderItem from "./UserOrderItem";


function UserOrders() {
    useEffect(() => {
        document.title = "User Orders Page";
    }, []);
    const { data, isLoading } = useGetAllOrdersQuery()

    return (
        <>
            {isLoading ? (
                <div className="animate-pulse">
                {/* Skeleton for the title */}
                <div className="w-48 h-6 bg-gray-300 rounded-md mb-4"></div>
    
                {/* Skeleton for order items */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 mb-3">
                        <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
                        <div className="flex flex-col flex-grow">
                            <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
                            <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-1"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>) : (
                <div className='mt-5'>
                    <div className="mb-3">
                        <SubTitle title={`number of orders # ${data?.results}`} />
                    </div>
                    <div className="">

                        {
                            data?.data.map((item) => (
                                <UserOrderItem key={item._id} orderItems={item} isLoading={isLoading} />
                            ))
                        }

                    </div>
                </div>)}
        </>

    )
}

export default UserOrders
