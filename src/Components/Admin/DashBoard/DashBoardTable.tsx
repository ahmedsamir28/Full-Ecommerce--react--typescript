import Update_Order_Hook from "../../../Hooks/Orders/Update_Order_Hook";
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";

function DashBoardTable() {
const   [getAllOrders,getOrder,ordersLoading,orderLoading,isOpenConfirmModal,handleCloseModal,handleShowModal,formatDate,orderDeliverDone,orderPaidDone] = Update_Order_Hook()
    return (
        <>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                title="Processing orders"
            >
                <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
                    {orderLoading ? (
                        <p>Loading order details...</p> // Loader feedback for order details
                    ) : getOrder?.data ? (
                        <>
                            <div className="border-2 rounded-md py-2 px-3 mb-3 shadow-md">
                                <h2 className="text-xl font-bold capitalize mb-1">Client Details</h2>
                                <hr />
                                <div className="my-2">
                                    <div><span className="font-bold"> Name: </span><span>{getOrder.data.user?.name || "N/A"} </span></div>
                                    <div><span className="font-bold"> Phone: </span><span>{getOrder.data.user?.phone || "N/A"} </span></div>
                                    <div><span className="font-bold">Email: </span> <span>{getOrder.data.user?.email || "N/A"} </span></div>
                                    <div><span className="font-bold">City: </span> <span>{getOrder.data.shippingAddress?.city || "N/A"} </span></div>
                                    <div><span className="font-bold">Details: </span><span>{getOrder.data.shippingAddress?.details || "N/A"} </span></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b pb-4">
                                <h2 className="text-lg font-semibold">Order Number <span className="text-blue-600"># {getOrder.data.id}</span></h2>
                                <span className="text-sm text-gray-500">Done On {formatDate(getOrder.data.createdAt)}</span>
                            </div>

                            <div className="mt-4 space-y-4">
                                {getOrder.data.cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                                        <img
                                            src={item.product?.imageCover}
                                            alt="product"
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium capitalize">{item.product?.title}</h3>
                                            <p className="text-sm text-gray-500">Quantity <span className="font-bold text-blue-600">{item.count}</span></p>
                                            <p className="font-semibold text-gray-500 mt-1">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between ">
                                    <div className="flex gap-5 items-center">
                                        <span className="text-sm font-semibold">Delivery :</span>
                                        <span className="text-error">{getOrder.data.isDelivered ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</span>
                                    </div>
                                    {
                                        !getOrder.data.isDelivered && (
                                            <Button onClick={(e) => orderDeliverDone(e, getOrder.data._id)} className="btn btn-primary btn-outline">
                                                Done
                                            </Button>
                                        )
                                    }
                                </div>

                                <div className="flex items-center justify-between ">
                                    <div className="flex gap-5 items-center">
                                        <span className="text-sm font-semibold">Pay :</span>
                                        <span className="text-error">{getOrder.data.isPaid ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</span>
                                    </div>
                                    {
                                        !getOrder.data.isPaid && (
                                            <Button onClick={(e) => orderPaidDone(e, getOrder.data._id)} className="btn btn-primary btn-outline">
                                                Done
                                            </Button>
                                        )
                                    }
                                </div>

                                <div className="flex gap-5 items-center">
                                    <span className="text-sm font-semibold">Payment Method :</span>
                                    <span className="text-blue-800 font-bold text-lg">{getOrder.data.paymentMethodType}</span>
                                </div>
                            </div>

                            <div className="flex gap-5 justify-between items-center mt-6 border-t pt-4">
                                <span className="text-xl font-semibold">Total</span>
                                <span className="text-xl font-bold">${getOrder.data.totalOrderPrice.toFixed(0)}</span>
                            </div>
                        </>
                    ) : (
                        <p>No order details available.</p>
                    )}
                </div>
            </Modal>

            <div className="overflow-x-auto border-2 rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="text-center">
                            <th className="capitalize font-extrabold text-black text-sm">Order No</th>
                            <th className="capitalize font-extrabold text-black text-sm">Request From</th>
                            <th className="capitalize font-extrabold text-black text-sm">Email</th>
                            <th className="capitalize font-extrabold text-black text-sm">Is Delivered</th>
                            <th className="capitalize font-extrabold text-black text-sm">Is Paid</th>
                            <th className="capitalize font-extrabold text-black text-sm">Price</th>
                            <th className="capitalize font-extrabold text-black text-sm">Payment Method</th>
                            <th className="capitalize font-extrabold text-black text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    <div className="animate-pulse">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index} className="flex justify-between items-center mb-2">
                                                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ) : getAllOrders?.data && getAllOrders.data.length > 0 ? (
                            getAllOrders.data.map((item) => (
                                <tr key={item._id} className="text-center capitalize">
                                    <td className="font-extrabold text-sm">{item.id}</td>
                                    <td className="font-extrabold text-sm">{item.user?.name || "Unknown"}</td>
                                    <td className="font-extrabold text-sm">{item.user?.email || "N/A"}</td>
                                    <td>{item.isDelivered ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</td>
                                    <td>{item.isPaid ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</td>
                                    <td className="font-extrabold text-sm">${item.totalOrderPrice.toFixed(0)}</td>
                                    <td>{item.paymentMethodType}</td>
                                    <td>
                                        <Button className="btn btn-primary btn-outline" onClick={(e) => handleShowModal(e, item._id)}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DashBoardTable;
