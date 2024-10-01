import { FormEvent, MouseEvent, useState } from "react";
import { useDeleteAddressesMutation } from "../../../Redux/RTK Query/addresses_slice";
import Notify from "../../../Utils/UseNotifaction";

function DeleteUserAddressHook() {
    // Modal visibility state
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // Selected address ID for deletion
    const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>('');

    // Close the delete modal
    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    // Open the delete modal and set the address ID to delete
    const handleShowDeleteModal = (e: MouseEvent<HTMLDivElement>, addressId: string | undefined) => {
        e.preventDefault();
        console.log(addressId);

        setSelectedAddressId(addressId);
        setIsOpenDeleteModal(true);
    };

    const [deleteAddresses, { isLoading: addressIsLoading }] = useDeleteAddressesMutation()
    const deleteAddressHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            deleteAddresses(selectedAddressId)
            setIsOpenDeleteModal(true)
            Notify({ msg: 'All data has been added successfully.', type: 'success' });
        } catch {
            Notify({ msg: 'There is a problem, try again.', type: 'error' });
        }
    }

    return [isOpenDeleteModal , handleCloseDeleteModal , handleShowDeleteModal,addressIsLoading,deleteAddressHandler] as  const 
}

export default DeleteUserAddressHook
