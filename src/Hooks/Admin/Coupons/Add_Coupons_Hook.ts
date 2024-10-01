import { FormEvent, MouseEvent, useRef, useState } from "react";
import { usePostCouponsMutation } from "../../../Redux/RTK Query/coupons_slice";
import Notify from "../../../Utils/UseNotifaction";

function AddCouponsHook() {
    // Correct the typing and initial value for useRef
    const dateRef = useRef<HTMLInputElement | null>(null);

    // State for controlling the confirmation modal visibility
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    // Functions to handle the opening and closing of the confirmation modal
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    // State for storing address details
    const [state, setState] = useState({
        name: '',
        expire: '',
        discount: '',
    });

    // Function to open the edit modal with selected address data
    const handleShowEditModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleShowModal()
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const [postCoupons, { isLoading: isCouponLoading }] = usePostCouponsMutation()

    // Handle form submission
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!state.name || !state.expire || !state.discount) {
            return Notify({ msg: 'Please enter all required data', type: 'error' });
        }

        try {
            await postCoupons(state)
            Notify({ msg: 'All data has been added successfully.', type: 'success' });
            setState({ name: "", expire: "", discount: "" })
            handleCloseModal()
        } catch {
            return Notify({ msg: 'Something is wrong', type: 'error' });
        }
    };

    return [dateRef, isOpenConfirmModal, handleCloseModal, state, handleShowEditModal, handleInputChange, isCouponLoading, handleFormSubmit] as const
}

export default AddCouponsHook
