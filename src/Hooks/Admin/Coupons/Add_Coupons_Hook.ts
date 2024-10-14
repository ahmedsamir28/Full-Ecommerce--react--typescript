import { FormEvent, MouseEvent, useRef, useState } from "react";
import { usePostCouponsMutation } from "../../../Redux/RTK Query/coupons_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddCouponsHook() {
    const dateRef = useRef<HTMLInputElement | null>(null);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    const [state, setState] = useState({
        name: '',
        expire: '',
        discount: '',
    });

    const handleShowAddModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleShowModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const [postCoupons, { isLoading: isCouponLoading }] = usePostCouponsMutation();

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.name || !state.expire || !state.discount) {
            return Notify({ msg: 'Please enter all required data', type: 'error' });
        }

        try {
            await postCoupons(state);
            Notify({ msg: 'All data has been added successfully.', type: 'success' });
            setState({ name: "", expire: "", discount: "" });
            handleCloseModal();
        } catch {
            return Notify({ msg: 'Something is wrong', type: 'error' });
        }
    };

    return [
        dateRef,
        isOpenConfirmModal,
        handleCloseModal,
        state,
        handleShowAddModal,
        handleInputChange,
        isCouponLoading,
        handleFormSubmit,
    ] as const;
}

export default AddCouponsHook;
