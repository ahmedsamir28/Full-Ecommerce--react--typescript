import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { CartItem } from "../../../Interface";
import { useRemoveFromCartMutation, useUpdateQuantityMutation } from "../../../Redux/RTK Query/cart_slice";
import Notify from "../../../Utils/UseNotifaction";

function Handle_Quantity_Change_Hook(cart: CartItem | undefined) {
    const [quantity, setQuantity] = useState(cart?.count || 1);

    // Effect to update quantity when cart changes
    useEffect(() => {
        if (cart?.count) {
            setQuantity(cart.count);
        }
    }, [cart]);

    const [updateQuantity] = useUpdateQuantityMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    // Handle quantity change
    const handleQuantityChange = async (event: ChangeEvent<HTMLSelectElement>, cartId: string) => {
        const newCount = parseInt(event.target.value, 10);
        try {
            await updateQuantity({ cartId, count: newCount }).unwrap();
            Notify({ msg: 'Quantity updated successfully', type: 'success' });
        } catch {
            Notify({ msg: 'Error updating quantity', type: 'error' });
        }
    };

    // Handle product removal from the cart
    const handleRemoveFromCart = async (e: MouseEvent<HTMLButtonElement>, cartId: string) => {
        e.preventDefault();
        try {
            await removeFromCart(cartId).unwrap();
            Notify({ msg: 'Product removed from cart successfully', type: 'success' });
        } catch {
            Notify({ msg: 'Error removing item from cart', type: 'error' });
        }
    };

    return [quantity, handleQuantityChange, handleRemoveFromCart] as const
}

export default Handle_Quantity_Change_Hook
