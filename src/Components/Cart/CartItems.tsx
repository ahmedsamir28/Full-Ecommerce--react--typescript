import { useGetCartQuery, useRemoveAllCartMutation } from "../../Redux/RTK Query/cart_slice";
import Button from "../../UI-items/Button";
import CartCheckout from "./CartCheckout";
import CartItemCard from "./CartItemCard";
import { CartItem } from "../../Interface";
import { MouseEvent } from "react";
import Notify from "../../Utils/UseNotifaction";

function CartItems() {
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
        } catch (err) {
            console.error("Failed to remove all items from cart:", err);
            Notify({ msg: 'Failed to clear cart', type: 'error' });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                    Cart <span className="text-sm text-zinc-500">({data?.numOfCartItems ?? 0} items)</span>
                </div>
                {
                    (data?.numOfCartItems ?? 0) > 0 && (
                        <Button onClick={handleRemoveAllCart} className="capitalize border-2 py-2 px-3 hover:bg-zinc-200 text-zinc-500 text-sm">
                            <i className="fa-regular fa-trash-can"></i> Remove All
                        </Button>
                    )
                }

            </div>

            <div className="mt-5 flex items-start justify-between gap-5">
                <div className="flex flex-col gap-5 w-full">
                    {data?.data?.products?.map((item: CartItem) => (
                        <CartItemCard key={item.product._id} cart={item} isLoading={isLoading} />
                    ))}
                </div>
                <div>
                    <CartCheckout totalCartPrice={ data?.data.totalCartPrice} totalAfterDiscount={data?.data.totalAfterDiscount} numOfCartItems={data?.numOfCartItems} />
                </div>
            </div>
        </div>
    );
}

export default CartItems;
