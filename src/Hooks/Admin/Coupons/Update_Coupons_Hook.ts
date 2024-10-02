import { FormEvent, MouseEvent, useRef, useState } from "react";
import { useUpdateCouponsMutation } from "../../../Redux/RTK Query/coupons_slice";
import Notify from "../../../Utils/UseNotifaction";

function UpdateCouponsHook() {

    const dateRef = useRef<HTMLInputElement | null>(null);

    const [isOpenConfirmEditModal, setIsOpenConfirmEditModal] = useState(false);

    const handleCloseModal = () => setIsOpenConfirmEditModal(false);
    const handleShowModal = () => setIsOpenConfirmEditModal(true);

    const [selectedCouponId, setSelectedCouponId] = useState<string>();

    const [state, setState] = useState({
        name: '',
        expire: '',
        discount: '',
    });

    const handleShowEditModal = (e: MouseEvent<HTMLButtonElement>, couponId: string, name: string, expire: string, discount: string) => {
        e.preventDefault();
        handleShowModal();
        setSelectedCouponId(couponId);
        setState({
            name: name,
            expire: expire,
            discount: discount,
        })
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const [updateCoupons, { isLoading: isCouponLoading }] = useUpdateCouponsMutation();

    // Handle form submission
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateCoupons({ couponId: selectedCouponId, couponData: state });
            Notify({ msg: 'All data has been updated successfully.', type: 'success' });
            setState({ name: "", expire: "", discount: "" });
            handleCloseModal();
        } catch {
            return Notify({ msg: 'Something is wrong', type: 'error' });
        }
    };

    return [dateRef, isOpenConfirmEditModal, handleCloseModal, handleShowEditModal, state, handleInputChange, isCouponLoading, handleFormSubmit] as const
}

export default UpdateCouponsHook
