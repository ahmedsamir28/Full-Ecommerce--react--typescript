import { FormEvent, useEffect, useState } from "react";
import { useGetLoggedUserQuery, useUpdateUserDataMutation } from "../../../Redux/RTK Query/logged_users_slice";
import Notify from "../../../Utils/UseNotifaction";

function UpdateUserDataHook() {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [state, setState] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // Open and close modal functions
    const handleShowEditModal = () => setIsOpenEditModal(true);
    const handleCloseEditModal = () => setIsOpenEditModal(false);

    // Fetching logged-in user data
    const { data, isLoading: isFetchingUser } = useGetLoggedUserQuery();

    useEffect(() => {
        if (data?.data) {
            const { name, phone, email } = data.data;
            setState({
                name: name || '',
                phone: phone || '',
                email: email || '',
            });
        }
    }, [data]);

    // Update user mutation hook
    const [updateUserData, { isLoading: isUpdating }] = useUpdateUserDataMutation();

    // Form submission handler
    const editUserDataHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple form validation
        if (!state.name || !state.phone || !state.email) {
            setFormErrors("All fields are required.");
            return;
        }

        try {
            await updateUserData(state).unwrap();
            Notify({ msg: 'Data updated successfully.', type: 'success' });
            handleCloseEditModal();
        } catch {
            Notify({ msg: 'Failed to update user data.', type: 'error' });
        }
    };

    return [isOpenEditModal, state, formErrors, handleChange, handleCloseEditModal, handleShowEditModal, data, isFetchingUser, isUpdating, editUserDataHandler] as const
}

export default UpdateUserDataHook
