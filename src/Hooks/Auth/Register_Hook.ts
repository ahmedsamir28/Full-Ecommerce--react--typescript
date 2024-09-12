import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";
import Notify from "../../Utils/UseNotifaction";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../../validation";
import { authRegister } from "../../Redux/action";

type TFormInputs = {
    name: string
    phone: string
    email: string;
    password: string;
    passwordConfirm: string
};

// Define an interface for the error object
interface ApiError {
    response?: {
        data?: {
            errors?: Array<{ msg: string }>
        }
    }
}

// Type guard function
function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'response' in error;
}

function RegisterHook() {
    const navigate = useNavigate();
    const { user, error } = useAppSelector(({ register }: RootState) => register)
    const dispatch = useAppDispatch()

    // Handle successful registration
    if (user) {
        Notify({ msg: 'You will navigate to the login page after 2 seconds to login.', type: 'success' });
        setTimeout(() => {
            navigate("/auth/login");
        }, 2000);
    }

    // Handle registration errors
    if (error) {
        let errorMessage = "An unknown error occurred";
        if (isApiError(error)) {
            errorMessage = error.response?.data?.errors?.[0]?.msg || errorMessage;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        switch (errorMessage) {
            case "E-mail already in use":
                Notify({ msg: "E-mail already in use", type: "error" });
                break;
            case "accept only egypt phone numbers":
                Notify({ msg: "accept only egypt phone numbers", type: "error" });
                break;
            case "must be at least 6 chars":
                Notify({ msg: "must be at least 6 chars", type: "error" });
                break;
            default:
                Notify({ msg: "An error occurred", type: "error" });
        }
    }

    const { register, handleSubmit, formState: { errors }, } = useForm<TFormInputs>({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<TFormInputs> = (data) => {
        console.log(data);
        dispatch(authRegister(data))
    }

    return [register, handleSubmit,errors,onSubmit ] as const 
}

export default RegisterHook
