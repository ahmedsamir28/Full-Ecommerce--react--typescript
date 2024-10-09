import { MouseEvent } from "react";
import { useGetCartQuery, useRemoveAllCartMutation } from "../../../Redux/RTK Query/cart_slice";
import Notify from "../../../Utils/UseNotifaction";

function Remove_All_Cart_Hook() {
    const { data, isLoading } = useGetCartQuery();
    const [removeAllCart] = useRemoveAllCartMutation();

    const handleRemoveAllCart = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await removeAllCart().unwrap();
            Notify({ msg: 'Cart cleared successfully', type: 'success' });
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch {
            Notify({ msg: 'Failed to clear cart', type: 'error' });
        }
    };

    return [data, isLoading, handleRemoveAllCart] as const
}

export default Remove_All_Cart_Hook
