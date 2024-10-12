import { MouseEvent, useState } from "react";
import { useGetAllOrdersQuery, useGetSpecificOrderQuery, useUpdateOrderToDeliverMutation, useUpdateOrderToPaidMutation } from "../../Redux/RTK Query/orders_slice";
import Notify from "../../Utils/UseNotifaction";

function Update_Order_Hook() {
    const [selectOrderId, setSelectOrderId] = useState<string>('');
    const { data: getAllOrders, isLoading: ordersLoading } = useGetAllOrdersQuery();
    const { data: getOrder, isLoading: orderLoading } = useGetSpecificOrderQuery(selectOrderId, { skip: !selectOrderId });
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    const handleCloseModal = () => setIsOpenConfirmModal(false)

    const handleShowModal = (e: MouseEvent<HTMLButtonElement>, orderId: string) => {
        e.preventDefault();
        setSelectOrderId(orderId);
        setIsOpenConfirmModal(true);
    }

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "Invalid date";
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const [updateOrderToDeliver] = useUpdateOrderToDeliverMutation();
    const [updateOrderToPaid] = useUpdateOrderToPaidMutation()

    const orderDeliverDone = async (e: MouseEvent<HTMLButtonElement>, orderId: string | undefined) => {
        e.preventDefault();
        if (!orderId) return;
        try {
            await updateOrderToDeliver(orderId).unwrap();
            Notify({ msg: "The operation was completed successfully", type: 'success' });
        } catch {
            Notify({ msg: "There is an error. Try again", type: 'error' });
        }
    }

    const orderPaidDone = async (e: MouseEvent<HTMLButtonElement>, orderId: string | undefined) => {
        e.preventDefault();
        if (!orderId) return;
        try {
            await updateOrderToPaid(orderId).unwrap();
            Notify({ msg: "The operation was completed successfully", type: 'success' });
        } catch {
            Notify({ msg: "There is an error. Try again", type: 'error' });
        }
    }

    return [getAllOrders,getOrder,ordersLoading,orderLoading,isOpenConfirmModal,handleCloseModal,handleShowModal,formatDate,orderDeliverDone,orderPaidDone] as const
}
export default Update_Order_Hook
