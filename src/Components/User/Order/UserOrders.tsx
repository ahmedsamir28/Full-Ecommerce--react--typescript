import { useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../Redux/RTK Query/orders_slice";
import SubTitle from "../../../Utils/SubTitle"
import UserOrderItem from "./UserOrderItem";


function UserOrders() {
    useEffect(() => {
        document.title = "User Orders Page";
    }, []);
    const { data, isLoading } = useGetAllOrdersQuery()
    console.log(data);

    return (
        <div className='mt-5'>
            <div className="mb-3">
                <SubTitle title="number of orders # 54" />
            </div>
            <div className="">

                {
                data?.data.map((item) => (
                    <UserOrderItem key={item._id} orderItems={item} isLoading={isLoading} />
                ))
                }

            </div>
        </div>
    )
}

export default UserOrders
