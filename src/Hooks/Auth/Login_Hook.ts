import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";
import Notify from "../../Utils/UseNotifaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../validation";
import { authLogin } from "../../Redux/action";
import { useEffect } from "react";

type TFormInputs = {
    email: string;
    password: string;
};

// Define an interface for the error object
interface ApiError {
    response?: {
        data?: {
            message: string
        }
    }
}

// Type guard function
function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'response' in error;
}

function LoginHook() {
    const { user, error, loading } = useAppSelector(({ login }: RootState) => login);
    const dispatch = useAppDispatch();



    useEffect(() => {
        if (loading === false) {
            if (user?.token) {
                Notify({ msg: 'You will navigate to the home page after 2 seconds.', type: 'success' });
                setTimeout(() => {
                    window.location.href = "/"
                }, 1000);
            } else {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }

            if (error) {
                let errorMessage = "An unknown error occurred";
                if (isApiError(error)) {
                    errorMessage = error.response?.data?.message || errorMessage;
                } else if (typeof error === 'string') {
                    errorMessage = error;
                }

                if (errorMessage) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    Notify({ msg: "Incorrect email or password", type: "error" });

                }
            }
        }
    }, [loading, user, error])

    const { register, handleSubmit, formState: { errors } } = useForm<TFormInputs>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<TFormInputs> = (data) => {
        dispatch(authLogin(data));
    };

    return [register, handleSubmit, errors, onSubmit] as const;
}

export default LoginHook;