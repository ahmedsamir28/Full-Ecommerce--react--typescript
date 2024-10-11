import { Order } from "../../../Interface"
import UserOrderCard from "./UserOrderCard"

interface IOrder {
    orderItems: Order
    isLoading: boolean
}

function UserOrderItem({ orderItems, isLoading }: IOrder) {
    // const formatDate = (dateString: string): string => {
    //     const date = new Date(dateString);  
    //     const year = date.getFullYear();  
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');  
    //     const day = date.getDate().toString().padStart(2, '0');  
    //     return `${year}-${month}-${day}`;  
    // }

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) {
            return "Invalid date";
        }
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <>
            {
                isLoading ? (<div className="px-5 mt-4 border-2 rounded-lg bg-zinc-100 animate-pulse" >
                    <div className="flex justify-between items-center py-2 font-medium text-md text-zinc-400">
                        <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                    {
                        orderItems?.cartItems.map((item) => (
                            <UserOrderCard cartItems={item} isLoading={isLoading} />
                        ))
                    }
                    <div className="flex items-center justify-between my-3">
                        <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
                        <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
                    </div>
                </div>) : (<div className="px-5 mt-4 border-2 rounded-lg bg-zinc-50">
                    <div>
                        <div className="flex justify-between items-center py-2 font-medium text-md text-zinc-600">
                            <div>
                                Order number <span className="text-blue-700"># {orderItems.id}</span>
                            </div>
                            <div>
                                Done On  <span className="text-blue-700">{formatDate(orderItems.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {
                        orderItems?.cartItems.map((item) => (
                            <UserOrderCard cartItems={item} isLoading={isLoading} />
                        ))
                    }

                    <div className="flex items-center justify-between my-3">
                        <div className="">
                            <div className='flex items-center justify-start gap-3 text-sm '>
                                <div className="border-2 py-2 px-3 rounded-lg">
                                    <div className="text-center">Delivery</div>
                                    <div className="text-sm text-center">
                                        <span className="text-error">{orderItems.isDelivered ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                                <div className="border-2 py-2 px-3 rounded-lg">
                                    <div className="text-center">Pay</div>
                                    <div className="text-sm">
                                        <span className="text-success">{orderItems.isPaid ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>

                                <div className="border-2 py-2 px-3 rounded-lg">
                                    <div className="">payment method</div>
                                    <div className="text-sm text-center text-zinc-500">{orderItems.paymentMethodType}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-content-end">
                            <div>
                                <div className="text-lg font-medium text-zinc-600">$ {orderItems.totalOrderPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>

    )
}

export default UserOrderItem
