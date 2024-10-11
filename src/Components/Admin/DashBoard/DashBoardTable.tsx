import { FormEvent, MouseEvent, useState } from "react";
import { useGetAllOrdersQuery, useGetSpecificOrderQuery } from "../../../Redux/RTK Query/orders_slice";
import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";

function DashBoardTable() {
    const [selectOrderId, setSelectOrderId] = useState<string>('');
    const { data: getAllOrders, isLoading: ordersLoading } = useGetAllOrdersQuery();
    const { data: getOrder, isLoading: orderLoading } = useGetSpecificOrderQuery(selectOrderId, { skip: !selectOrderId });
    console.log(getOrder);

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(true);
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = (e: MouseEvent<HTMLButtonElement>, orderId: string) => {
        e.preventDefault();
        setSelectOrderId(orderId);
        setIsOpenConfirmModal(true);
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) {
            return "Invalid date";
        }
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                onSubmit={handleSubmit}
                title="Processing orders"
            >
                <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
                    {orderLoading ? (
                        <p>Loading order details...</p> // Loader feedback for order details
                    ) : (
                        <>
                            <div className="border-2 rounded-md py-2 px-3 mb-3 shadow-md">
                                <h2 className="text-xl font-bold capitalize mb-1">client details</h2>
                                <hr />
                                <div className="my-2">
                                    <div><span className="font-bold"> Name : </span><span>{getOrder?.data.user.name} </span></div>
                                    <div><span className="font-bold"> Phone : </span><span> {getOrder?.data.user.phone} </span></div>
                                    <div><span className="font-bold">Email : </span> <span> {getOrder?.data.user.email} </span></div>
                                    <div><span className="font-bold">City : </span> <span> {getOrder?.data.shippingAddress.city} </span></div>
                                    <div><span className="font-bold"> Details : </span><span>{getOrder?.data.shippingAddress.details} </span></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b pb-4">
                                <h2 className="text-lg font-semibold">Order number <span className="text-blue-600"># {getOrder?.data.id}</span></h2>
                                <span className="text-sm text-gray-500">Done On {formatDate(getOrder?.data.createdAt)}</span>
                            </div>

                            <div className="mt-4 space-y-4">
                                {getOrder?.data.cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                                        <img
                                            src={item.product.imageCover}
                                            alt="product"
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium capitalize">{item.product.title}</h3>
                                            <p className="text-sm text-gray-500">Quantity <span className="font-bold text-blue-600">{item.count}</span></p>
                                            <p className="font-semibold text-gray-500 mt-1 ">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 space-y-1">
                                <div className="flex gap-5 items-center">
                                    <span className="text-sm font-semibold">Delivery :</span>
                                    <span className="text-error">{getOrder?.data.isDelivered ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</span>
                                </div>

                                <div className="flex gap-5 items-center">
                                    <span className="text-sm font-semibold">Pay :</span>
                                    <span className="text-error">{getOrder?.data.isPaid ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</span>
                                </div>

                                <div className="flex gap-5 items-center">
                                    <span className="text-sm font-semibold">Payment Method :</span>
                                    <span className="text-blue-800 font-semibold">{getOrder?.data.paymentMethodType}</span>
                                </div>
                            </div>

                            <div className="flex gap-5 justify-between items-center mt-6 border-t pt-4">
                                <span className="text-xl font-semibold">Total</span>
                                <span className="text-xl font-bold">$ {getOrder?.data.totalOrderPrice.toFixed(0)}</span>
                            </div>
                        </>
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
                                        {/* Skeleton loader for multiple rows */}
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
                                <tr key={item._id} className="text-center">
                                    <td className="font-bold"># {item.id || "N/A"}</td>
                                    <td>{item.user?.name || "N/A"}</td>
                                    <td>{item.user?.email || "N/A"}</td>
                                    <td className="text-error">{item.isDelivered ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</td>
                                    <td className="text-success">{item.isPaid ? <div className="text-success">Yes</div> : <div className="text-error">No</div>}</td>
                                    <td>$ {item.totalOrderPrice?.toFixed(0) || "N/A"}</td>
                                    <td className="text-zinc-500 text-lg font-bold">{item.paymentMethodType || "N/A"}</td>
                                    <td>
                                        <Button onClick={(e) => handleShowModal(e, item._id)} className="btn btn-outline btn-primary">Handling process</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    No orders available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DashBoardTable;
