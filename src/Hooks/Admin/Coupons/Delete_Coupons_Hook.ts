import { FormEvent, useState } from "react";
import { useDeleteCouponsMutation } from "../../../Redux/RTK Query/coupons_slice";
import Notify from "../../../Utils/UseNotifaction";

function DeleteCouponsHook() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [selectedCouponId, setSelectedCouponId] = useState<string>('');

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = (e: FormEvent<HTMLButtonElement>, couponId: string) => {
        e.preventDefault();
        setSelectedCouponId(couponId);
        setIsOpenDeleteModal(true);
    };

    const [deleteCoupons, { isLoading: isDeleting }] = useDeleteCouponsMutation();


    const removeCouponHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await deleteCoupons(selectedCouponId);
            handleCloseDeleteModal();
            Notify({ msg: 'The coupon has been deleted successfully.', type: 'success' });
        } catch {
            Notify({ msg: 'The coupon has not been deleted', type: 'error' });
        }
    }

    return [ isOpenDeleteModal,handleCloseDeleteModal,handleShowDeleteModal,isDeleting,removeCouponHandler]  as const 
}

export default DeleteCouponsHook
