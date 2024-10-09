import { ChangeEvent, MouseEvent, useState } from "react";
import { useApplyCouponMutation } from "../../../Redux/RTK Query/cart_slice";

interface ErrorWithStatus {
    data: {
        message: string
    }
    status: number;
}
function Apply_Coupon_To_Cart_Hook() {
    const [coupon, setCoupon] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [applyCoupon, { isLoading }] = useApplyCouponMutation();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
        setErrorMessage(null);
        setSuccessMessage(null);
    };


    const applyCouponHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!coupon) {
            setErrorMessage("Please enter a coupon code.");
            return;
        }

        try {
            await applyCoupon({ couponName: coupon }).unwrap();
            setSuccessMessage("Coupon applied successfully!");
            setErrorMessage(null);
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                const errorWithStatus = err as ErrorWithStatus;
                if (errorWithStatus.status === 400) {
                    setErrorMessage(`${errorWithStatus.data.message}`);
                }
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return [ coupon, isLoading,errorMessage,successMessage,handleInput,applyCouponHandler] as const
}

export default Apply_Coupon_To_Cart_Hook
