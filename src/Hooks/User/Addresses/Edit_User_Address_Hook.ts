import { Address } from './../../../Interface/index';
import { FormEvent, MouseEvent, useState } from "react";
import { useUpdateAddressesMutation } from "../../../Redux/RTK Query/addresses_slice";
import Notify from "../../../Utils/UseNotifaction";

function EditUserAddressHook(address : Address | undefined) {
    // Modal open/close state
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    // Function to close the edit modal
    const handleCloseEditModal = () => setIsOpenEditModal(false);

    const [updateAddresses, { isLoading: editAddressIsLoading }] = useUpdateAddressesMutation();

    // Selected address ID for deletion
    const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(undefined);

    // State for storing address details
    const [state, setState] = useState({
        alias: "",
        details: "",
        phone: "",
        city: "",
        postalCode: ""
    });

    // Function to open the edit modal with selected address data
    const handleShowEditModal = (e: MouseEvent<HTMLDivElement>, addressId: string | undefined) => {
        e.preventDefault();
        if (addressId) {
            setSelectedAddressId(addressId);
            setIsOpenEditModal(true);
            setState({
                alias: address?.alias || "",
                details: address?.details || "",
                phone: address?.phone || "",
                city: address?.city || "",
                postalCode: address?.postalCode || ""
            });

        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!state.alias || !state.details || !state.city || !state.phone) {
            return Notify({ msg: "Please enter all required data", type: "error" });
        }

        if (selectedAddressId) {
            try {
                await updateAddresses({ addressId: selectedAddressId, addressData: state }).unwrap();
                Notify({ msg: "Address updated successfully", type: "success" });
                setState({ alias: "", details: "", phone: "", city: "", postalCode: "" });
                handleCloseEditModal();
            } catch {
                Notify({ msg: "Something went wrong", type: "error" });
            }
        }
    };

    return [isOpenEditModal, handleCloseEditModal, editAddressIsLoading, state, handleShowEditModal, handleInputChange, handleFormSubmit] as const

}

export default EditUserAddressHook
