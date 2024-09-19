import { useState } from "react";
import Notify from "../../../Utils/UseNotifaction";
import { useUpdateUserPasswordMutation } from "../../../Redux/RTK Query/logged_users_slice";

function ChangePasswordHook() {
    const [state, setState] = useState({
        currentPassword: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // Step 1: Destructure the mutation trigger function
    const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();

    const handleSavePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Correct the equality checks
        if (state.currentPassword === '' || state.password === '' || state.passwordConfirm === '') {
            Notify({ msg: 'There is no data', type: 'error' });
            return;
        }

        // Step 2: Call the mutation trigger function and pass the state
        try {
            await updateUserPassword(state);
            Notify({ msg: 'Password updated successfully. Please log in again.', type: 'success' });
            setTimeout(() => {
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
            }, 2000);
        } catch {
            // Handle error (e.g., display error message)
            Notify({ msg: 'Error updating password', type: 'error' });
        }
    };

    return [state, handleChange, handleSavePassword, isLoading] as const
}

export default ChangePasswordHook
