import { FormEvent, useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { usePostAddressMutation } from "../../../Redux/RTK Query/addresses_slice";

function AddUserAddressHook() {
    // State for controlling the confirmation modal visibility
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    // Functions to handle the opening and closing of the confirmation modal
    const handleCloseModal = () => setIsOpenConfirmModal(false);
    const handleShowModal = () => setIsOpenConfirmModal(true);

    const [postAddress, { isLoading }] = usePostAddressMutation()
    // State for storing address details
    const [state, setState] = useState({
        alias: "",
        details: "",
        phone: "",
        city: "",
        postalCode: ""
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!state.alias || !state.details || !state.city || !state.phone) {
            return Notify({ msg: 'Please enter all required data', type: 'error' });
        }

        try {
            await postAddress(state)
            Notify({ msg: 'All data has been added successfully.', type: 'success' });
            setState({ alias: "", details: "", phone: "", city: "", postalCode: "" })
            handleCloseModal()
        } catch {
            return Notify({ msg: 'Something is wrong', type: 'error' });
        }
    };

    return [isOpenConfirmModal, handleCloseModal, handleShowModal, state, isLoading, handleFormSubmit, handleInputChange] as const
}

export default AddUserAddressHook
