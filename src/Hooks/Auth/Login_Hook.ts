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
        status: number;
        data?: {
            message: string;
        };
    };
}

// Type guard function for identifying ApiError
function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'response' in error;
}

function LoginHook() {
    const { user, error, loading } = useAppSelector((state: RootState) => state.login);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!loading) {
            if (user?.token) {
                Notify({ msg: 'You will navigate to the home page after 2 seconds.', type: 'success' });
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            if (error) {
                if (isApiError(error) && error.response?.status === 500) {
                    Notify({ msg: "Incorrect email or password", type: "error" });
                }
            }
        }

    }, [loading, user, error]);

    // Form setup
    const { register, handleSubmit, formState: { errors } } = useForm<TFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    // Form submission handler
    const onSubmit: SubmitHandler<TFormInputs> = (data) => {
        dispatch(authLogin(data));
    };

    return [register, handleSubmit, errors, onSubmit] as const;
}

export default LoginHook;
