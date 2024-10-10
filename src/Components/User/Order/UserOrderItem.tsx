import { Order } from "../../../Interface"
import UserOrderCard from "./UserOrderCard"

interface  IOrder {
    orderItems : Order
    isLoading :boolean
}

function UserOrderItem({orderItems,isLoading} :IOrder) {
    console.log(orderItems);
    
    return (
        <div className="px-5 mt-4 border-2 rounded-lg bg-zinc-50">
            <div>
                <div className="flex justify-between items-center py-2 font-medium text-md text-zinc-600">
                    <div>
                        Order number <span className="text-blue-700"># 454</span>
                    </div>
                    <div>
                        Done On  <span className="text-blue-700">24/24/2024</span>
                    </div>
                </div>
            </div>

            <UserOrderCard />

            <div className="flex items-center justify-between my-3">
                <div className="">
                    <div className='flex items-center justify-start gap-3 text-sm '>
                        <div className="border-2 py-2 px-3 rounded-lg">
                            <div className="text-center">Delivery</div>
                            <div className="text-sm text-center">
                                <span className="text-error">No</span>
                            </div>
                        </div>
                        <div className="border-2 py-2 px-3 rounded-lg">
                            <div className="text-center">Pay</div>
                            <div className="text-sm">
                                <span className="text-success">Yes</span>
                            </div>
                        </div>

                        <div className="border-2 py-2 px-3 rounded-lg">
                            <div className="">payment method</div>
                            <div className="text-sm text-center text-zinc-500">Cash</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-content-end">
                    <div>
                        <div className="text-lg font-medium text-zinc-600">$ 4124</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOrderItem
